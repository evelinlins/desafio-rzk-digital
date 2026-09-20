// Tabela Dimensao: dm_pedidos
// Origem: olist_orders_dataset.csv
let
    // Parametro de conexao para a pasta de arquivos
    CaminhoPedidos = pCaminhoBase & "olist_orders_dataset.csv",
    
    // Leitura do dataset de pedidos
    FontePedidos = Csv.Document(File.Contents(CaminhoPedidos), [Delimiter=",", Columns=8, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    CabecalhosPedidos = Table.PromoteHeaders(FontePedidos, [PromoteAllScalars=true]),
    
    // Tipagem dos dados
    TiposPedidos = Table.TransformColumnTypes(CabecalhosPedidos, {
        {"order_id", type text},
        {"customer_id", type text},
        {"order_status", type text},
        {"order_purchase_timestamp", type datetime},
        {"order_approved_at", type datetime},
        {"order_delivered_carrier_date", type datetime},
        {"order_delivered_customer_date", type datetime},
        {"order_estimated_delivery_date", type datetime}
    }),
    
    // Extracao da data pura de compra
    DataCompraAdicionada = Table.AddColumn(TiposPedidos, "data_compra", each DateTime.Date([order_purchase_timestamp]), type date),
    
    // Calculo do tempo real de entrega em dias corridos
    TempoEntregaCalculado = Table.AddColumn(DataCompraAdicionada, "lead_time_entrega_dias", each 
        if [order_delivered_customer_date] <> null then 
            Duration.Days([order_delivered_customer_date] - [order_purchase_timestamp]) 
        else null, 
        type number
    ),
    
    // Calculo da variacao em relacao ao prazo estimado
    AtrasoEntregaCalculado = Table.AddColumn(TempoEntregaCalculado, "dias_desvio_prazo", each 
        if [order_delivered_customer_date] <> null and [order_estimated_delivery_date] <> null then 
            Duration.Days([order_delivered_customer_date] - [order_estimated_delivery_date]) 
        else null, 
        type number
    ),
    
    // Status de cumprimento do prazo de entrega
    StatusPrazoAdicionado = Table.AddColumn(AtrasoEntregaCalculado, "status_cumprimento_prazo", each 
        if [order_status] <> "delivered" then "Em Aberto ou Cancelado"
        else if [dias_desvio_prazo] <= 0 then "No Prazo"
        else "Com Atraso",
        type text
    )
in
    StatusPrazoAdicionado
