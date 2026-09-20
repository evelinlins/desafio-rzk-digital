"""
Testes de Integridade Lógica e Regras de Negócio do Mercadinho Pro
Valida:
1. Sanitização contra Formula Injection (CSV / Sheets Injection)
2. Cálculo de Subtotais, Descontos e Total a Pagar
3. Cálculo de Troco no Pagamento em Dinheiro
4. Decremento e Alerta de Estoque Mínimo
"""

import unittest

def sanitize_sheet_value(val):
    if isinstance(val, str) and len(val) > 0:
        first_char = val[0]
        if first_char in ('=', '+', '-', '@', '\t'):
            return "'" + val
    return val

def calculate_cart_totals(items, discount=0.0):
    subtotal = sum(item['quantidade'] * item['precoUnitario'] for item in items)
    total = max(0.0, subtotal - discount)
    return round(subtotal, 2), round(discount, 2), round(total, 2)

def calculate_change(total, received):
    return max(0.0, round(received - total, 2))

def decrement_stock(current_stock, quantity_sold):
    return max(0.0, round(current_stock - quantity_sold, 2))

def is_critical_stock(current_stock, min_stock):
    return current_stock <= min_stock


class TestMercadinhoLogic(unittest.TestCase):

    def test_formula_injection_sanitization(self):
        self.assertEqual(sanitize_sheet_value("=SUM(A1:A10)"), "'=SUM(A1:A10)")
        self.assertEqual(sanitize_sheet_value("+cmd|' /C calc'!A0"), "'+cmd|' /C calc'!A0")
        self.assertEqual(sanitize_sheet_value("-2+3*cmd"), "'-2+3*cmd")
        self.assertEqual(sanitize_sheet_value("@SUM(1,2)"), "'@SUM(1,2)")
        self.assertEqual(sanitize_sheet_value("Arroz 5kg"), "Arroz 5kg")
        self.assertEqual(sanitize_sheet_value(25.90), 25.90)

    def test_cart_totals_calculation(self):
        items = [
            {'nome': 'Arroz 5kg', 'quantidade': 2, 'precoUnitario': 27.90},   # 55.80
            {'nome': 'Leite 1L', 'quantidade': 3, 'precoUnitario': 5.29},     # 15.87
            {'nome': 'Pão Francês', 'quantidade': 1.5, 'precoUnitario': 15.90} # 23.85
        ]
        subtotal, discount, total = calculate_cart_totals(items, discount=5.52)
        self.assertEqual(subtotal, 95.52)
        self.assertEqual(discount, 5.52)
        self.assertEqual(total, 90.00)

    def test_change_calculation(self):
        total = 90.00
        received = 100.00
        troco = calculate_change(total, received)
        self.assertEqual(troco, 10.00)

        # Pagamento exato
        self.assertEqual(calculate_change(90.00, 90.00), 0.0)

        # Pagamento menor (não gera troco negativo)
        self.assertEqual(calculate_change(90.00, 50.00), 0.0)

    def test_stock_decrement_and_critical_alert(self):
        estoque_inicial = 12.0
        estoque_minimo = 5.0

        # Venda de 8 unidades -> novo saldo: 4.0
        saldo_1 = decrement_stock(estoque_inicial, 8.0)
        self.assertEqual(saldo_1, 4.0)
        self.assertTrue(is_critical_stock(saldo_1, estoque_minimo))

        # Venda de 10 unidades com saldo de 4 -> zero (sem estoque negativo)
        saldo_2 = decrement_stock(saldo_1, 10.0)
        self.assertEqual(saldo_2, 0.0)
        self.assertTrue(is_critical_stock(saldo_2, estoque_minimo))


if __name__ == '__main__':
    unittest.main()
