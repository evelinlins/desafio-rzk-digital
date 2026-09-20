# Modelagem Dimensional e Catalogo DAX: Desafio Tecnico RZK Digital

## 1. Visao Geral da Arquitetura

O projeto de Business Intelligence foi estruturado para atender a tomada de decisao executiva na RZK Digital, utilizando os dados transacionais do ecossistema Brazilian E-Commerce da Olist.

A modelagem adota o padrao dimensional Star Schema (Esquema Estrela), garantindo performance analitica superior, simplicidade na construcao de calculos DAX, ausencia de ambiguidade nas relacoes e escalabilidade para grandes volumes de transacoes.

### Esquema Estrela (Star Schema)

A tabela fato central consolida as transacoes no menor nivel de granularidade (item de pedido), conectada diretamente as tabelas dimensao de primeira ordem:

* ft_pedidos_itens: Tabela Fato Central (Granularidade: Item de Pedido)
* dm_produtos: Dimensao de Produtos e Categorias
* dm_sellers: Dimensao de Vendedores e Localizacao
* dm_pedidos: Dimensao de Cabecalho de Pedidos, Status e Lead Times
* dm_avaliacoes: Dimensao de Avaliacoes, Satisfacao e Notas
* dm_calendario: Dimensao Temporal Dinamica

Relacionamentos estabelecidos:
* ft_pedidos_itens (N) para dm_pedidos (1) via coluna order_id
* ft_pedidos_itens (N) para dm_produtos (1) via coluna product_id
* ft_pedidos_itens (N) para dm_sellers (1) via coluna seller_id
* ft_pedidos_itens (N) para dm_calendario (1) via coluna data_compra
* dm_avaliacoes vinculada contextualmente ao pedido via order_id

---

## 2. Especificacao das Tabelas e Scripts Power Query (Linguagem M)

### 2.1 Tabela Fato: ft_pedidos_itens
* Granularidade: Uma linha por item de pedido (order_id + order_item_id).
* Metricas Nativas: Preco unitario (price), valor do frete (freight_value), valor total do item (valor_total_item = price + freight_value).
* Chaves Estrangeiras: order_id, product_id, seller_id, data_compra.

### 2.2 Tabela Dimensao: dm_produtos
* Granularidade: Uma linha por produto unico (product_id).
* Atributos Principais: Nome da categoria original, categoria tratada e formatada em caixa alta/baixa, traducao para ingles, dimensoes fisicas (peso, comprimento, altura, largura) e cubagem volumetrica (volume_cm3).
* Tratamento de Qualidade: Categorias nulas ou em branco tratadas e rotuladas como "outros".

### 2.3 Tabela Dimensao: dm_sellers
* Granularidade: Uma linha por vendedor unico (seller_id).
* Atributos Principais: Identificador do vendedor, cidade, estado (UF), macrorregiao geografica do Brasil e rotulo reduzido para visualizacao executiva.
* Enriquecimento de Negocio: Categorizacao automatica das cinco regioes brasileiras para analise de dispersao logistica e polos de oferta.

### 2.4 Tabela Dimensao: dm_pedidos
* Granularidade: Uma linha por pedido unico (order_id).
* Atributos Principais: customer_id, order_status, timestamps de compra, aprovacao, envio e entrega ao cliente.
* Metricas de Eficiencia: Lead time total de entrega em dias, desvio em relacao a data estimada e classificacao de cumprimento de prazo (No Prazo / Com Atraso).

### 2.5 Tabela Dimensao: dm_avaliacoes
* Granularidade: Uma linha por avaliacao unica consolidada por pedido (order_id).
* Atributos Principais: review_id, order_id, review_score (1 a 5), textos de comentario, timestamp de resposta.
* Segmentacao de Satisfacao: Categorizacao em Promotores (4 e 5), Neutros (3) e Detratores (1 e 2).

### 2.6 Tabela Dimensao: dm_calendario
* Granularidade: Uma linha por dia continuo no intervalo de 01/01/2016 a 31/12/2018.
* Atributos Principais: Data, Ano, Mes Numero, Mes Nome, Mes/Ano, Trimestre, Semestre, Dia da Semana e Indicador de Fim de Semana.

---

## 3. Catalogo de Medidas DAX Otimizadas

As medidas foram desenvolvidas com foco em baixo consumo de memoria e execucao vetorial rapida no motor VertiPaq.

### 3.1 Faturamento e Receita
* Faturamento Total = SUM(ft_pedidos_itens[price])
* Faturamento com Frete = SUM(ft_pedidos_itens[valor_total_item])
* Total Frete = SUM(ft_pedidos_itens[freight_value])
* Percentual Frete sobre Faturamento = DIVIDE([Total Frete], [Faturamento Total], 0)

### 3.2 Volume e Operacao
* Volume Itens Vendidos = COUNTROWS(ft_pedidos_itens)
* Quantidade Pedidos Unicos = DISTINCTCOUNT(ft_pedidos_itens[order_id])
* Quantidade Sellers Ativos = DISTINCTCOUNT(ft_pedidos_itens[seller_id])
* Itens por Pedido = DIVIDE([Volume Itens Vendidos], [Quantidade Pedidos Unicos], 0)

### 3.3 Ticket Medio
* Ticket Medio por Seller = DIVIDE([Faturamento Total], DISTINCTCOUNT(ft_pedidos_itens[order_id]), 0)
* Ticket Medio por Pedido = DIVIDE([Faturamento Total], [Quantidade Pedidos Unicos], 0)
* Ticket Medio por Item = DIVIDE([Faturamento Total], [Volume Itens Vendidos], 0)

### 3.4 Avaliacoes e Experiencia do Cliente
* Total Avaliacoes = CALCULATE(COUNTROWS(dm_avaliacoes), TREATAS(VALUES(ft_pedidos_itens[order_id]), dm_avaliacoes[order_id]))
* Nota Media Avaliacao = CALCULATE(AVERAGE(dm_avaliacoes[review_score]), TREATAS(VALUES(ft_pedidos_itens[order_id]), dm_avaliacoes[order_id]))
* Taxa Satisfacao Clientes = DIVIDE([Total Avaliacoes Promotores], [Total Avaliacoes], 0)

### 3.5 Rankings Dinamicos por Ano: Categorias de Produtos
* Rank Categoria Faturamento: Utiliza RANKX denso sobre as categorias selecionadas contextualmente no ano.
* Rank Categoria Volume: Ordena pelo volume absoluto de unidades comercializadas no periodo.
* Rank Categoria Avaliacao: Aplica filtro estatistico de significancia minima (amostra minima de 50 avaliacoes) para mitigar distorcoes amostrais de categorias de baixissimo volume com notas infladas.

### 3.6 Rankings Dinamicos por Ano: Sellers
* Rank Seller Faturamento: Identifica os vendedores lideres em faturamento bruto anual.
* Rank Seller Volume: Mapeia os maiores operadores em capacidade operacional de envio.
* Rank Seller Avaliacao: Avalia o indice de satisfacao com threshold minimo de 30 pedidos avaliados, assegurando consistencia estatistica.

### 3.7 Analise Temporal e Preditiva (Year over Year)
* Crescimento Faturamento YoY: Mede o percentual de expansao da receita em relacao ao mesmo periodo do ano anterior via SAMEPERIODLASTYEAR.
* Crescimento Volume YoY: Mede a variacao da escala fisica de pedidos ano contra ano.
