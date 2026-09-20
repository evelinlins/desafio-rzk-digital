// Tabela Dimensao: dm_sellers
// Origem: olist_sellers_dataset.csv
let
    // Parametro de conexao para a pasta de arquivos
    CaminhoSellers = pCaminhoBase & "olist_sellers_dataset.csv",
    
    // Leitura do dataset de sellers
    FonteSellers = Csv.Document(File.Contents(CaminhoSellers), [Delimiter=",", Columns=4, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    CabecalhosSellers = Table.PromoteHeaders(FonteSellers, [PromoteAllScalars=true]),
    
    // Tipagem dos dados
    TiposSellers = Table.TransformColumnTypes(CabecalhosSellers, {
        {"seller_id", type text},
        {"seller_zip_code_prefix", type text},
        {"seller_city", type text},
        {"seller_state", type text}
    }),
    
    // Padronizacao textual de cidades e estados
    CidadeFormatada = Table.TransformColumns(TiposSellers, {
        {"seller_city", each Text.Proper(Text.Trim(_)), type text},
        {"seller_state", each Text.Upper(Text.Trim(_)), type text}
    }),
    
    // Enriquecimento com macrorregioes brasileiras
    RegiaoAdicionada = Table.AddColumn(CidadeFormatada, "regiao_brasil", each 
        if List.Contains({"SP", "RJ", "MG", "ES"}, [seller_state]) then "Sudeste"
        else if List.Contains({"PR", "SC", "RS"}, [seller_state]) then "Sul"
        else if List.Contains({"BA", "PE", "CE", "MA", "PB", "RN", "AL", "SE", "PI"}, [seller_state]) then "Nordeste"
        else if List.Contains({"MT", "MS", "GO", "DF"}, [seller_state]) then "Centro-Oeste"
        else if List.Contains({"AM", "PA", "RO", "TO", "AC", "AP", "RR"}, [seller_state]) then "Norte"
        else "Outro",
        type text
    ),
    
    // Codigo do seller resumido para exibicao em graficos executivos
    SellerLabelAdicionado = Table.AddColumn(RegiaoAdicionada, "seller_short_id", each "Seller " & Text.Start([seller_id], 6), type text)
in
    SellerLabelAdicionado
