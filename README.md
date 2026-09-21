# RZK Digital - E-commerce Analytics

Entrega do desafio técnico de Business Intelligence para a RZK Digital, desenvolvida com o Brazilian E-Commerce Public Dataset by Olist.

## Links

- Dashboard web: **[inserir link do GitHub Pages]**
- Repositório: **[inserir link do GitHub]**
- Arquivo Power BI: **[inserir link para o arquivo `.pbix`]**

## Objetivo

Construir uma análise exploratória de e-commerce para identificar os melhores sellers e categorias de produto, usando faturamento, volume de itens vendidos, avaliação média e ticket médio.

## Entregáveis

- Dashboard em Power BI com filtros anuais e análises de categorias e sellers.
- Site executivo em HTML com narrativa, recomendações e visão técnica.
- Modelagem dimensional e medidas DAX reutilizáveis.

## Indicadores principais

- Faturamento: soma do preço dos itens, sem frete.
- Volume de itens: quantidade de linhas na tabela de itens do pedido.
- Pedidos únicos: contagem distinta de `order_id`.
- Ticket médio por pedido: faturamento dividido por pedidos únicos.
- Nota média: média das avaliações disponíveis.

## Modelagem

A modelagem é orientada pela tabela fato `ft_pedidos_itens`, no grão de item do pedido. As entidades de apoio permitem analisar o desempenho por produto, seller, pedido, avaliação e calendário.

| Tabela | Papel |
| --- | --- |
| `ft_pedidos_itens` | Fato central de receita e volume |
| `ft_pedidos` | Dados transacionais e logísticos do pedido |
| `ft_avaliacoes` | Avaliações e notas dos clientes |
| `dm_produtos` | Produto e categoria |
| `dm_sellers` | Seller e localização |
| `dm_calendario` | Ano, mês e trimestre |

## Insights de negócio

- Em 2017, os 20% maiores sellers concentraram 80,7% da receita. Em 2018 parcial, a concentração permaneceu em 79,0%.
- Cama, Mesa e Banho liderou faturamento e volume em 2017. Em 2018 parcial, Beleza e Saúde assumiu a liderança nas duas frentes.
- Pedidos entregues no prazo ou antes tiveram nota média de 4,29. Pedidos com mais de três dias de atraso tiveram média de 1,94.
- A ação prioritária é prevenir atraso por seller, rota e prazo prometido, já que a logística tem impacto direto na satisfação.

## Limitações e escopo

- O período disponível vai de setembro de 2016 a outubro de 2018.
- Os anos de 2016 e 2018 são parciais e não devem ser comparados como anos completos.
- Faturamento representa o valor dos itens (`price`), sem frete.
- As recomendações são hipóteses de negócio baseadas no histórico e devem ser validadas com metas e testes controlados.

## Como publicar o site

1. Crie um repositório no GitHub.
2. Envie o arquivo `index.html` desta pasta para a raiz do repositório.
3. Em **Settings > Pages**, selecione a branch principal e a pasta `/ (root)`.
4. Aguarde a publicação e copie o link gerado pelo GitHub Pages.
5. Atualize os links deste README antes de compartilhar.

## Fonte

Brazilian E-Commerce Public Dataset by Olist, disponibilizado no Kaggle.
