// Tabela Dimensao: dm_calendario
// Geracao dinamica e continua do calendario analitico
let
    // Definicao do intervalo temporal cobrindo a totalidade das transacoes do dataset
    DataInicial = #date(2016, 1, 1),
    DataFinal = #date(2018, 12, 31),
    TotalDias = Duration.Days(DataFinal - DataInicial) + 1,
    
    // Geracao da lista de datas continuas
    ListaDatas = List.Dates(DataInicial, TotalDias, #duration(1, 0, 0, 0)),
    TabelaDatas = Table.FromList(ListaDatas, Splitter.SplitByNothing(), {"data"}, null, ExtraValues.Error),
    DataTipada = Table.TransformColumnTypes(TabelaDatas, {{"data", type date}}),
    
    // Atributos de tempo
    AnoAdicionado = Table.AddColumn(DataTipada, "ano", each Date.Year([data]), Int64.Type),
    MesNumAdicionado = Table.AddColumn(AnoAdicionado, "mes_numero", each Date.Month([data]), Int64.Type),
    MesNomeAdicionado = Table.AddColumn(MesNumAdicionado, "mes_nome", each Text.Proper(Date.MonthName([data], "pt-BR")), type text),
    MesAnoAdicionado = Table.AddColumn(MesNomeAdicionado, "mes_ano", each Date.ToText([data], "MMM/yyyy", "pt-BR"), type text),
    MesAnoNumAdicionado = Table.AddColumn(MesAnoAdicionado, "mes_ano_num", each Date.Year([data]) * 100 + Date.Month([data]), Int64.Type),
    
    // Trimestre e Semestre
    TrimestreNumAdicionado = Table.AddColumn(MesAnoNumAdicionado, "trimestre", each Date.QuarterOfYear([data]), Int64.Type),
    TrimestreNomeAdicionado = Table.AddColumn(TrimestreNumAdicionado, "trimestre_nome", each "T" & Text.From(Date.QuarterOfYear([data])) & "/" & Text.From(Date.Year([data])), type text),
    SemestreAdicionado = Table.AddColumn(TrimestreNomeAdicionado, "semestre", each if Date.Month([data]) <= 6 then 1 else 2, Int64.Type),
    SemestreNomeAdicionado = Table.AddColumn(SemestreAdicionado, "semestre_nome", each "S" & Text.From(if Date.Month([data]) <= 6 then 1 else 2) & "/" & Text.From(Date.Year([data])), type text),
    
    // Dia da semana e indicador de final de semana
    DiaSemanaNumAdicionado = Table.AddColumn(SemestreNomeAdicionado, "dia_semana_numero", each Date.DayOfWeek([data], Day.Monday) + 1, Int64.Type),
    DiaSemanaNomeAdicionado = Table.AddColumn(DiaSemanaNumAdicionado, "dia_semana_nome", each Text.Proper(Date.DayOfWeekName([data], "pt-BR")), type text),
    DiaMesAdicionado = Table.AddColumn(DiaSemanaNomeAdicionado, "dia_mes", each Date.Day([data]), Int64.Type),
    EhFimDeSemanaAdicionado = Table.AddColumn(DiaMesAdicionado, "eh_fim_de_semana", each if Date.DayOfWeek([data], Day.Monday) >= 5 then "Sim" else "Nao", type text)
in
    EhFimDeSemanaAdicionado
