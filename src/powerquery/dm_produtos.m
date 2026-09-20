// Tabela Dimensao: dm_produtos
// Origem: olist_products_dataset.csv integrado com product_category_name_translation.csv
let
    // Parametro de conexao para a pasta de arquivos
    CaminhoProdutos = pCaminhoBase & "olist_products_dataset.csv",
    CaminhoTraducao = pCaminhoBase & "product_category_name_translation.csv",
    
    // Leitura do dataset de produtos
    FonteProdutos = Csv.Document(File.Contents(CaminhoProdutos), [Delimiter=",", Columns=9, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    CabecalhosProdutos = Table.PromoteHeaders(FonteProdutos, [PromoteAllScalars=true]),
    
    // Leitura do dataset de traducao de categorias
    FonteTraducao = Csv.Document(File.Contents(CaminhoTraducao), [Delimiter=",", Columns=2, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    CabecalhosTraducao = Table.PromoteHeaders(FonteTraducao, [PromoteAllScalars=true]),
    
    // Tipagem rigorosa da tabela de produtos
    TiposProdutos = Table.TransformColumnTypes(CabecalhosProdutos, {
        {"product_id", type text},
        {"product_category_name", type text},
        {"product_name_lenght", Int64.Type},
        {"product_description_lenght", Int64.Type},
        {"product_photos_qty", Int64.Type},
        {"product_weight_g", type number},
        {"product_length_cm", type number},
        {"product_height_cm", type number},
        {"product_width_cm", type number}
    }),
    
    // Tratamento de valores nulos na categoria
    CategoriaTratada = Table.ReplaceValue(TiposProdutos, null, "outros", Replacer.ReplaceValue, {"product_category_name"}),
    CategoriaVaziaTratada = Table.ReplaceValue(CategoriaTratada, "", "outros", Replacer.ReplaceValue, {"product_category_name"}),
    
    // Juncao com a traducao para padronizacao
    TraducaoMesclada = Table.NestedJoin(CategoriaVaziaTratada, {"product_category_name"}, CabecalhosTraducao, {"product_category_name"}, "dm_traducao", JoinKind.LeftOuter),
    TraducaoExpandida = Table.ExpandTableColumn(TraducaoMesclada, "dm_traducao", {"product_category_name_english"}, {"product_category_name_english"}),
    
    // Formatacao de texto para apresentacao executiva
    CategoriaFormatada = Table.AddColumn(TraducaoExpandida, "categoria_formatada", each Text.Proper(Text.Replace([product_category_name], "_", " ")), type text),
    
    // Calculo do volume cubico do produto em cm3
    VolumeCalculado = Table.AddColumn(CategoriaFormatada, "volume_cm3", each [product_length_cm] * [product_height_cm] * [product_width_cm], type number),
    
    // Selecao e organizacao final das colunas
    ColunasFinais = Table.SelectColumns(VolumeCalculado, {
        "product_id",
        "product_category_name",
        "categoria_formatada",
        "product_category_name_english",
        "product_name_lenght",
        "product_description_lenght",
        "product_photos_qty",
        "product_weight_g",
        "volume_cm3"
    })
in
    ColunasFinais
