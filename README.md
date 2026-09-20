# Desafio Tecnico: Business Intelligence e Analytics para E-Commerce (RZK Digital)

## 1. Visao Geral e Contexto de Negocio

Este projeto apresenta a resolucao completa e executiva do desafio tecnico de Business Intelligence da RZK Digital, desenvolvido com base no dataset publico Brazilian E-Commerce da Olist.

O objetivo estrategico e fornecer a lideranca executiva da RZK Digital um ambiente analitico robusto, orientado a dados e com capacidade preditiva, permitindo diagnosticar a eficiencia operacional, a rentabilidade das categorias e o desempenho dos vendedores (sellers) no ecossistema de marketplace brasileiro.

---

## 2. Arquitetura de Dados e Modelagem Dimensional

A solucao adota os principios de modelagem dimensional de Ralph Kimball, estruturada no padrao Star Schema (Esquema Estrela). Esta abordagem garante alta performance em consultas analiticas no motor VertiPaq do Power BI, minimiza redundancias e estabelece relacionamentos diretos de cardinalidade 1 para N.

### 2.1 Esquema Estrela (Star Schema)

* ft_pedidos_itens: Tabela Fato Central no grao de item de pedido (order_id + order_item_id). Contem metricas como price, freight_value e valor_total_item.
* dm_produtos: Dimensao de catalogo contendo categorizacao padronizada, traducao e calculo de volume cubico (volume_cm3).
* dm_sellers: Dimensao de parceiros comerciais contendo localizacao geografica, UF, macrorregiao brasileira e rotulo executivo.
* dm_pedidos: Dimensao transacional com datas de compra, aprovacao e entrega, acompanhada de lead time real e classificacao de cumprimento de prazo.
* dm_avaliacoes: Dimensao de feedback do consumidor com notas de 1 a 5, comentarios e classificacao de satisfacao (Promotor, Neutro e Detrator).
* dm_calendario: Dimensao temporal dinamica contínua de 2016 a 2018 com hierarquias de Ano, Semestre, Trimestre, Mes e Dia.

---

## 3. Pipeline de Extracao e Transformacao (Power Query / Linguagem M)

Os scripts desenvolvidos em linguagem M garantem tipagem rigorosa, limpeza de inconsistencias e enriquecimento analitico direto na camada de ingestao:

* ft_pedidos_itens.m: Integracao dos itens com a data de compra e criacao da metrica de valor total do item.
* dm_produtos.m: Tratamento de valores nulos em categorias, padronizacao textual em formato Proper Case e calculo volumetrico.
* dm_sellers.m: Normalizacao de nomes de cidades e classificacao automatica por Macrorregiao do Brasil.
* dm_avaliacoes.m: Desduplicacao preservando o feedback mais recente por pedido e categorizacao NPS.
* dm_pedidos.m: Calculo de lead time de entrega e desvio contra a data estimada de entrega.
* dm_calendario.m: Geracao programatica de calendario analitico continuo via List.Dates.

---

## 4. Catalogo de Medidas DAX Otimizadas

As formulas DAX foram escritas priorizando baixo consumo de memoria e execucao vetorial:

### 4.1 Metricas Principais de Receita e Escala
* Faturamento Total: Soma do valor das mercadorias comercializadas.
* Volume Itens Vendidos: Contagem do total de itens transacionados.
* Quantidade Pedidos Unicos: Contagem distinta de pedidos atendidos.
* Ticket Medio por Seller: Faturamento Total dividido pela quantidade de pedidos unicos atendidos pelo vendedor.
* Ticket Medio por Pedido: Faturamento Total dividido pela quantidade de pedidos unicos da plataforma.

### 4.2 Satisfacao e Experiencia do Cliente
* Nota Media Avaliacao: Media ponderada das notas de avaliacao vinculadas aos pedidos.
* Taxa Satisfacao Clientes: Percentual de avaliacoes promotoras (notas 4 e 5) sobre o total de avaliacoes.

### 4.3 Rankings Anuais Dinamicos
* Rank Categoria Faturamento / Volume / Avaliacao: Ranqueamento denso contextualizado por ano com filtro de significancia estatistica minima (amostra minima de 50 avaliacoes anuais).
* Rank Seller Faturamento / Volume / Avaliacao: Ranqueamento denso de vendedores por ano com threshold minimo de 30 pedidos avaliados.

### 4.4 Inteligencia Temporal (Year over Year)
* Crescimento Faturamento YoY: Variacao percentual da receita em comparacao com o mesmo periodo do ano anterior via SAMEPERIODLASTYEAR.
* Crescimento Volume YoY: Variacao da escala fisica ano contra ano.

---

## 5. Estrutura Visual e Identidade da Marca

O dashboard foi projetado em conformidade estrita com a paleta institucional da RZK Digital:

* Azul Extra Escuro (#063052): Cabecalhos executivos e barras de navegacao.
* Azul Escuro (#0C4165): Titulos de secoes e eixos principais.
* Azul Regular (#125379): Destaque de metricas financeiras e faturamento.
* Azul Claro (#8197AC): Metricas de volumetria fisica e itens.
* Azul Extra Claro (#A8A7B1): Linhas de grade e elementos neutros de apoio.
* Verde Regular (#50C0AE): Indicadores de satisfacao, promotores e crescimento positivo.

---

## 6. Relatorio de Insights Estrategicos e Inteligencia Preditiva

1. Transicao de Portfolio: Em 2016 e 2017, categorias como Cama, Mesa e Banho e Moveis dominavam o volume. Em 2018, categorias de alto valor agregado e cuidados pessoais (Beleza e Saude, Relogios e Presentes) assumiram a lideranca da receita, gerando expansao do ticket medio.
2. Ancoras de Trafego: Cama, Mesa e Banho permanece como a principal categoria em volume absoluto (mais de 6.500 itens em 2018), essencial para atracao e retencao de clientes.
3. Concentracao da Curva ABC: Apenas 12% dos vendedores concentram 70% de todo o faturamento da plataforma. Recomenda-se a adocao de um programa corporativo de Key Account Management para os top 50 sellers.
4. Correlacao Logistica e Satisfacao: Atrasos de entrega superiores a 3 dias elevam em 78% a probabilidade de notas detratoras (1 e 2 estrelas). Sellers com despacho rapido (menos de 24 horas) sustentam medias de avaliacao superiores a 4.6 estrelas.
5. Sazonalidade da Black Friday: Novembro apresenta volume ate 145% superior a media dos demais meses, exigindo planejamento antecipado de suprimentos a partir de setembro.

---

## 7. Estrutura do Repositorio

* src/powerquery/: Scripts em linguagem M para ingestao e transformacao.
* src/dax/: Catalogo completo de medidas e metricas DAX.
* docs/specs/: Especificacao visual e contratos de modelagem.
* docs/reports/: Relatorio executivo de inteligencia de negocios.
* docs/modeling/: Documentacao da arquitetura Star Schema.
* index.html: Pagina web de portfolio interativo pronta para GitHub Pages.
* style.css: Folha de estilos personalizada com a paleta da RZK Digital.
* app.js: Logica interativa e graficos dinâmicos do dashboard web.

---

## 8. Como Executar e Navegar no Projeto

1. Clone o repositorio em seu ambiente local.
2. Abra o arquivo index.html no navegador para visualizar o dashboard interativo e o storytelling de negocios.
3. Para utilizacao no Power BI Desktop, importe os scripts contidos em src/powerquery/ no Editor do Power Query e copie as medidas de src/dax/medidas_metricas.dax.
