// Tabela Dimensao: dm_avaliacoes
// Origem: olist_order_reviews_dataset.csv
let
    // Parametro de conexao para a pasta de arquivos
    CaminhoAvaliacoes = pCaminhoBase & "olist_order_reviews_dataset.csv",
    
    // Leitura do dataset de avaliacoes com tratamento de quebras de linha no texto
    FonteAvaliacoes = Csv.Document(File.Contents(CaminhoAvaliacoes), [Delimiter=",", Columns=7, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
    CabecalhosAvaliacoes = Table.PromoteHeaders(FonteAvaliacoes, [PromoteAllScalars=true]),
    
    // Tipagem dos dados
    TiposAvaliacoes = Table.TransformColumnTypes(CabecalhosAvaliacoes, {
        {"review_id", type text},
        {"order_id", type text},
        {"review_score", Int64.Type},
        {"review_comment_title", type text},
        {"review_comment_message", type text},
        {"review_creation_date", type datetime},
        {"review_answer_timestamp", type datetime}
    }),
    
    // Remocao de duplicidades mantendo o registro mais recente por pedido
    LinhasOrdenadas = Table.Sort(TiposAvaliacoes, {{"order_id", Order.Ascending}, {"review_answer_timestamp", Order.Descending}}),
    DuplicadasRemovidas = Table.Distinct(LinhasOrdenadas, {"order_id"}),
    
    // Segmentacao da satisfacao do cliente
    ClassificacaoNPS = Table.AddColumn(DuplicadasRemovidas, "classificacao_satisfacao", each 
        if [review_score] >= 4 then "Promotor"
        else if [review_score] = 3 then "Neutro"
        else "Detrator",
        type text
    ),
    
    // Indicador booleano de presenca de comentario
    PossuiComentario = Table.AddColumn(ClassificacaoNPS, "possui_comentario", each 
        if [review_comment_message] <> null and Text.Trim([review_comment_message]) <> "" then 1 else 0, 
        Int64.Type
    )
in
    PossuiComentario
