// Tabela Fato: ft_pedidos_itens
// Origem: olist_order_items_dataset.csv integrado com datas de olist_orders_dataset.csv
let
    // Parametro de conexao para a pasta de arquivos
    CaminhoOrigem = pCaminhoBase & "olist_order_items_dataset.csv",
    
    // Leitura do arquivo CSV bruto
    Fonte = Csv.Document(File.Contents(CaminhoOrigem), [Delimiter=",", Columns=7, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    CabecalhosPromovidos = Table.PromoteHeaders(Fonte, [PromoteAllScalars=true]),
    
    // Tipagem rigorosa dos dados
    TiposAlterados = Table.TransformColumnTypes(CabecalhosPromovidos, {
        {"order_id", type text},
        {"order_item_id", Int64.Type},
        {"product_id", type text},
        {"seller_id", type text},
        {"shipping_limit_date", type datetime},
        {"price", Currency.Type},
        {"freight_value", Currency.Type}
    }),
    
    // Juncao com a tabela de pedidos para obter a data de compra diretamente no grao da fato
    OrigemPedidos = Csv.Document(File.Contents(pCaminhoBase & "olist_orders_dataset.csv"), [Delimiter=",", Columns=8, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    CabecalhosPedidos = Table.PromoteHeaders(OrigemPedidos, [PromoteAllScalars=true]),
    TiposPedidos = Table.TransformColumnTypes(CabecalhosPedidos, {
        {"order_id", type text},
        {"order_purchase_timestamp", type datetime}
    }),
    PedidosSelecionados = Table.SelectColumns(TiposPedidos, {"order_id", "order_purchase_timestamp"}),
    
    // Mesclar consultas
    MescladoComPedidos = Table.NestedJoin(TiposAlterados, {"order_id"}, PedidosSelecionados, {"order_id"}, "dm_pedidos_temp", JoinKind.Inner),
    PedidosExpandidos = Table.ExpandTableColumn(MescladoComPedidos, "dm_pedidos_temp", {"order_purchase_timestamp"}, {"order_purchase_timestamp"}),
    
    // Criacao de colunas derivadas necessarias para a modelagem Star Schema
    DataCompraAdicionada = Table.AddColumn(PedidosExpandidos, "data_compra", each DateTime.Date([order_purchase_timestamp]), type date),
    ValorTotalItemAdicionado = Table.AddColumn(DataCompraAdicionada, "valor_total_item", each [price] + [freight_value], Currency.Type),
    
    // Selecao e organizacao final das colunas no grao do item
    ColunasSelecionadas = Table.SelectColumns(ValorTotalItemAdicionado, {
        "order_id",
        "order_item_id",
        "product_id",
        "seller_id",
        "data_compra",
        "order_purchase_timestamp",
        "shipping_limit_date",
        "price",
        "freight_value",
        "valor_total_item"
    })
in
    ColunasSelecionadas
