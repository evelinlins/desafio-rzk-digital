# Especificacao de Design e Estrutura Visual do Dashboard: RZK Digital

## 1. Diretrizes de Design e Identidade Visual

O dashboard foi projetado seguindo as melhores praticas de UI/UX para Business Intelligence executivo, assegurando comunicacao visual imediata, hierarquia clara de informacoes e eliminacao de tabelas massivas para priorizar graficos de alto impacto cognitivo.

### Paleta Institucional RZK Digital

A identidade cromatica da RZK Digital foi aplicada com funcoes semanticas bem definidas:

* Azul Extra Escuro (#063052): Utilizado em cabecalhos executivos, barras de navegacao e fundos de contraste.
* Azul Escuro (#0C4165): Cor base para titulos de visuais, molduras de cartoes e eixos principais.
* Azul Regular (#125379): Cor primaria para representacao de metricas monetarias (Faturamento Total e Ticket Medio).
* Azul Claro (#8197AC): Cor secundaria para representacao de metricas de contagem e operacao (Volume de Itens e Quantidade de Pedidos).
* Azul Extra Claro (#A8A7B1): Cor de apoio para linhas de grade, eixos secundarios e elementos de contexto inativo.
* Verde Regular (#50C0AE): Cor de destaque estrategico para indicadores de qualidade (Nota Media de Avaliacao, NPS, Taxa de Promotores e Crescimento YoY Positivo).

---

## 2. Arquitetura das Telas no Power BI

O painel e composto por tres paginas complementares, construidas no padrao de resolucao 16:9 (1920x1080):

```
+-----------------------------------------------------------------------------------+
| CABECALHO EXECUTIVO RZK DIGITAL: FILTROS GLOBAIS (ANO, REGIAO, CATEGORIA, SELLER) |
+-----------------------------------------------------------------------------------+
|  [KPI 1: Faturamento]  [KPI 2: Volume Itens]  [KPI 3: Ticket Medio]  [KPI 4: Nota Media]  |
+-----------------------------------------------------------------------------------+
|                                        |                                          |
| VISUAL PRINCIPAL (ESQUERDA)            | VISUAL COMPLEMENTAR (DIREITA)            |
| Grafico de Dispersao / Barras          | Grafico de Linhas / Pareto               |
|                                        |                                          |
+-----------------------------------------------------------------------------------+
|                                                                                   |
| VISUAL INFERIOR CONSOLIDADO: ANALISE DE TENDENCIA E RANKING EXECUTIVO            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 3. Detalhamento dos Visuais por Pagina

### Pagina 1: Visao Executiva e Cockpit Macro

Objetivo: Proporcionar ao C-Level da RZK Digital uma visao consolidada da saude financeira e operacional da operacao.

1. Cartoes de Indicadores Estrategicos (KPI Cards):
   * Faturamento Total (Cor: #125379, com indicador YoY em #50C0AE).
   * Volume de Itens Vendidos (Cor: #8197AC).
   * Ticket Medio Geral (Cor: #125379).
   * Nota Media de Avaliacao (Cor: #50C0AE).

2. Grafico de Linhas com Area Gradiente: Evolucao Mensal de Faturamento e Tendencia
   * Eixo X: Mes/Ano (dm_calendario[mes_ano]).
   * Eixo Y: Faturamento Total.
   * Linha de Meta / Previsao: Regressao linear com intervalo de confianca de 95%.
   * Cores: Linha principal em #125379 e preenchimento suave com transparencia em #8197AC.

3. Grafico de Dispersao Estrategico (Scatter Plot): Matriz Volume versus Ticket Medio
   * Eixo X: Volume de Itens Vendidos.
   * Eixo Y: Ticket Medio por Pedido.
   * Tamanho da Bolha: Faturamento Total.
   * Saturacao de Cor: Nota Media de Avaliacao (#50C0AE para notas altas, #A8A7B1 para notas medias).
   * Finalidade: Segmentar categorias em quatro quadrantes de valor e volume sem recorrer a tabelas.

4. Grafico de Mapa de Calor / Barras Empilhadas 100%: Distribuicao Regional da Receita
   * Eixo Categorico: Macrorregioes do Brasil (Sudeste, Sul, Nordeste, Centro-Oeste, Norte).
   * Metrica: Participacao percentual no Faturamento Total.
   * Cores: Degradê de #063052 ate #8197AC.

---

### Pagina 2: Performance de Categorias de Produtos (Tres Perspectivas)

Objetivo: Comparar e ranquear as categorias de produtos por ano sob as oticas de receita, volume e satisfacao.

1. Grafico de Barras Horizontais com Destaque: Top 10 Categorias por Maior Faturamento
   * Eixo Y: Categoria do Produto.
   * Eixo X: Faturamento Total.
   * Cor da Barra: Azul Regular (#125379). Rotulos de dados expressos em R$ milhoes.

2. Grafico de Barras Horizontais: Top 10 Categorias por Maior Volume de Itens
   * Eixo Y: Categoria do Produto.
   * Eixo X: Volume de Itens Vendidos.
   * Cor da Barra: Azul Claro (#8197AC). Rotulos de dados com contagem exata de unidades.

3. Grafico de Pirulito (Lollipop Chart) ou Barras Divergentes: Maior Nota Media de Avaliacao
   * Eixo Y: Categoria do Produto (com filtro de significancia minima: n >= 50 avaliacoes).
   * Eixo X: Nota Media de Avaliacao (Escala 1 a 5).
   * Linha de Referencia (Benchmark): Meta de qualidade estabelecida em 4.0 (#0C4165).
   * Cor dos Marcadores: Verde Regular (#50C0AE).

4. Grafico de Linhas de Evolucao de Ranking (Bump Chart): Dinamica Anual das Top 5 Categorias
   * Eixo X: Ano (2016, 2017, 2018).
   * Eixo Y: Posicao no Ranking de Faturamento (1 a 5 invertido).
   * Finalidade: Demonstrar a ascensao e queda de relevancia de categorias ao longo dos anos.

---

### Pagina 3: Performance e Eficiencia de Sellers

Objetivo: Analisar os parceiros comerciais sob as tres perspectivas, avaliar o ticket medio por seller e gerenciar a concentracao de receita.

1. Matriz de Classificacao de Sellers (Grafico de Quadrantes / Scatter Plot)
   * Eixo X: Quantidade de Pedidos Unicos do Seller.
   * Eixo Y: Ticket Medio por Seller.
   * Tamanho da Bolha: Faturamento Total do Seller.
   * Cor da Bolha: Verde Regular (#50C0AE) para sellers com nota media >= 4.0; Azul Escuro (#0C4165) para notas inferiores.

2. Grafico de Curva ABC e Pareto: Concentracao de Faturamento por Seller
   * Eixo X: Sellers ordenados por faturamento decrescente.
   * Eixo Y Primario (Barras): Faturamento Individual (#125379).
   * Eixo Y Secundario (Linha): Percentual Acumulado da Receita (#50C0AE).
   * Linha de Corte: Marcador de 80% do faturamento total.

3. Grafico de Barras Agrupadas: Comparativo Top 10 Sellers (Faturamento versus Volume)
   * Comparacao lado a lado da receita monetaria e da escala operacional de expedicao.

4. Grafico de Dispersao Logistica: Lead Time de Entrega versus Nota Media do Seller
   * Eixo X: Lead Time Medio de Entrega em Dias.
   * Eixo Y: Nota Media de Avaliacao.
   * Finalidade: Demonstrar visualmente o impacto do atraso na reputacao do parceiro.
