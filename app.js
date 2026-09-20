// ==============================================================================
// LOGICA INTERATIVA E GRAFICOS: PORTFOLIO EXECUTIVO RZK DIGITAL
// PALETA DE CORES:
// Azul Extra Escuro: #063052 | Azul Escuro: #0C4165 | Azul Regular: #125379
// Azul Claro: #8197AC | Azul Extra Claro: #A8A7B1 | Verde Regular: #50C0AE
// ==============================================================================

// Base de Dados Estruturada por Ano
const dadosPorAno = {
    all: {
        faturamento: "R$ 15,82 M",
        faturamentoSub: "Receita transacionada de mercadorias no consolidado",
        yoyFaturamento: "+29.4% YoY",
        volume: "112.650",
        volumeSub: "Unidades físicas entregues",
        yoyVolume: "+35.1% YoY",
        ticket: "R$ 160,45",
        ticketSub: "Valor medio por pedido atendido",
        nota: "4.08 / 5.0",
        notaSub: "76.4% de clientes promotores (4 e 5)",
        categoriesRevenue: {
            labels: ["Beleza e Saude", "Relogios e Presentes", "Cama Mesa Banho", "Esporte e Lazer", "Informatica", "Moveis Decoracao", "Utilidades", "Automotivo"],
            data: [1.258, 1.205, 1.036, 0.988, 0.912, 0.729, 0.632, 0.592]
        },
        categoriesVolume: {
            labels: ["Cama Mesa Banho", "Beleza e Saude", "Esporte e Lazer", "Moveis Decoracao", "Informatica", "Utilidades", "Relogios e Presentes", "Telefonia"],
            data: [11115, 9670, 8641, 8334, 7827, 6990, 5991, 4545]
        },
        categoriesRating: {
            labels: ["Livros Gerais", "CDs e DVDs", "Livros Importados", "Alimentos e Bebidas", "Bebes", "Beleza e Saude", "Esporte e Lazer", "Informatica", "Moveis Decoracao"],
            data: [4.52, 4.45, 4.40, 4.31, 4.15, 4.12, 4.10, 3.92, 3.88]
        }
    },
    "2016": {
        faturamento: "R$ 46,8 K",
        faturamentoSub: "Fase piloto de operacao do marketplace",
        yoyFaturamento: "Ano Base",
        volume: "359",
        volumeSub: "Unidades físicas entregues",
        yoyVolume: "Ano Base",
        ticket: "R$ 130,36",
        ticketSub: "Valor medio por pedido atendido",
        nota: "4.15 / 5.0",
        notaSub: "78.2% de clientes promotores (4 e 5)",
        categoriesRevenue: {
            labels: ["Moveis Decoracao", "Beleza e Saude", "Brinquedos", "Automotivo", "Telefonia", "Cama Mesa Banho"],
            data: [0.0112, 0.0098, 0.0084, 0.0062, 0.0058, 0.0054]
        },
        categoriesVolume: {
            labels: ["Moveis Decoracao", "Beleza e Saude", "Cama Mesa Banho", "Telefonia", "Brinquedos", "Automotivo"],
            data: [75, 68, 62, 48, 42, 35]
        },
        categoriesRating: {
            labels: ["Brinquedos", "Beleza e Saude", "Automotivo", "Cama Mesa Banho", "Moveis Decoracao", "Telefonia"],
            data: [4.42, 4.30, 4.25, 4.18, 4.05, 3.95]
        }
    },
    "2017": {
        faturamento: "R$ 6,85 M",
        faturamentoSub: "Fase de rapida expansao e escala",
        yoyFaturamento: "+14.500% YoY",
        volume: "48.210",
        volumeSub: "Unidades físicas entregues",
        yoyVolume: "+13.300% YoY",
        ticket: "R$ 152,10",
        ticketSub: "Valor medio por pedido atendido",
        nota: "4.06 / 5.0",
        notaSub: "75.8% de clientes promotores (4 e 5)",
        categoriesRevenue: {
            labels: ["Cama Mesa Banho", "Beleza e Saude", "Esporte e Lazer", "Informatica", "Moveis Decoracao", "Relogios e Presentes", "Utilidades", "Automotivo"],
            data: [0.575, 0.520, 0.490, 0.450, 0.410, 0.395, 0.320, 0.280]
        },
        categoriesVolume: {
            labels: ["Cama Mesa Banho", "Moveis Decoracao", "Esporte e Lazer", "Beleza e Saude", "Informatica", "Utilidades", "Telefonia", "Brinquedos"],
            data: [4650, 3780, 3420, 3250, 2980, 2650, 2100, 1850]
        },
        categoriesRating: {
            labels: ["Livros Literatura", "CDs e DVDs", "Alimentos e Bebidas", "Bebes", "Beleza e Saude", "Esporte e Lazer", "Cama Mesa Banho", "Informatica"],
            data: [4.48, 4.42, 4.28, 4.14, 4.11, 4.08, 4.02, 3.90]
        }
    },
    "2018": {
        faturamento: "R$ 8,92 M",
        faturamentoSub: "Fase de maturidade e monetizacao",
        yoyFaturamento: "+30.2% YoY",
        volume: "64.081",
        volumeSub: "Unidades físicas entregues",
        yoyVolume: "+32.9% YoY",
        ticket: "R$ 168,20",
        ticketSub: "Valor medio por pedido atendido",
        nota: "4.09 / 5.0",
        notaSub: "76.9% de clientes promotores (4 e 5)",
        categoriesRevenue: {
            labels: ["Beleza e Saude", "Relogios e Presentes", "Cama Mesa Banho", "Esporte e Lazer", "Informatica", "Utilidades", "Automotivo", "Brinquedos"],
            data: [0.840, 0.780, 0.680, 0.590, 0.520, 0.410, 0.370, 0.320]
        },
        categoriesVolume: {
            labels: ["Cama Mesa Banho", "Beleza e Saude", "Esporte e Lazer", "Informatica", "Moveis Decoracao", "Utilidades", "Relogios e Presentes", "Automotivo"],
            data: [6500, 6350, 5180, 4100, 3950, 3820, 3710, 2950]
        },
        categoriesRating: {
            labels: ["Livros Importados", "Livros Gerais", "Alimentos e Bebidas", "Construcao Ferramentas", "Beleza e Saude", "Esporte e Lazer", "Informatica", "Moveis Decoracao"],
            data: [4.54, 4.50, 4.35, 4.24, 4.14, 4.11, 3.94, 3.86]
        }
    }
};

// Variaveis globais dos graficos Chart.js
let chartCatRevInstance = null;
let chartCatVolInstance = null;
let chartCatRatInstance = null;
let chartScatterInstance = null;
let chartParetoInstance = null;
let chartSellerTicketInstance = null;
let chartSellerVolInstance = null;
let chartDeliveryInstance = null;

// Inicializacao dos graficos quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
    inicializarGraficos();
});

function inicializarGraficos() {
    Chart.defaults.color = "#8197AC";
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    // 1. Grafico de Categorias por Faturamento
    const ctxCatRev = document.getElementById("chartCategoryRevenue").getContext("2d");
    chartCatRevInstance = new Chart(ctxCatRev, {
        type: "bar",
        data: {
            labels: dadosPorAno.all.categoriesRevenue.labels,
            datasets: [{
                label: "Faturamento (R$ Milhoes)",
                data: dadosPorAno.all.categoriesRevenue.data,
                backgroundColor: "#125379",
                borderColor: "#50C0AE",
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return " Faturamento: R$ " + context.raw.toFixed(2) + " M";
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: "rgba(129, 151, 172, 0.15)" },
                    ticks: { callback: value => "R$ " + value + "M" }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });

    // 2. Grafico de Categorias por Volume
    const ctxCatVol = document.getElementById("chartCategoryVolume").getContext("2d");
    chartCatVolInstance = new Chart(ctxCatVol, {
        type: "bar",
        data: {
            labels: dadosPorAno.all.categoriesVolume.labels,
            datasets: [{
                label: "Volume (Itens)",
                data: dadosPorAno.all.categoriesVolume.data,
                backgroundColor: "#8197AC",
                borderColor: "#0C4165",
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return " Volume: " + context.raw.toLocaleString("pt-BR") + " unidades";
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: "rgba(129, 151, 172, 0.15)" },
                    ticks: { callback: value => value.toLocaleString("pt-BR") }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });

    // 3. Grafico de Categorias por Avaliacao
    const ctxCatRat = document.getElementById("chartCategoryRating").getContext("2d");
    chartCatRatInstance = new Chart(ctxCatRat, {
        type: "bar",
        data: {
            labels: dadosPorAno.all.categoriesRating.labels,
            datasets: [{
                label: "Nota Media (1 a 5)",
                data: dadosPorAno.all.categoriesRating.data,
                backgroundColor: "#50C0AE",
                borderColor: "#063052",
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return " Nota Media: " + context.raw.toFixed(2) + " estrelas";
                        }
                    }
                }
            },
            scales: {
                x: {
                    min: 3.5,
                    max: 5.0,
                    grid: { color: "rgba(129, 151, 172, 0.15)" }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });

    // 4. Matriz Estrategica de Categorias (Dispersao Volume vs Ticket Medio)
    const ctxScatter = document.getElementById("chartCategoryScatter").getContext("2d");
    chartScatterInstance = new Chart(ctxScatter, {
        type: "bubble",
        data: {
            datasets: [
                {
                    label: "Beleza e Saude",
                    data: [{ x: 9670, y: 130.1, r: 20 }],
                    backgroundColor: "rgba(80, 192, 174, 0.8)",
                    borderColor: "#50C0AE"
                },
                {
                    label: "Relogios e Presentes",
                    data: [{ x: 5991, y: 201.2, r: 19 }],
                    backgroundColor: "rgba(80, 192, 174, 0.8)",
                    borderColor: "#50C0AE"
                },
                {
                    label: "Cama Mesa Banho",
                    data: [{ x: 11115, y: 93.2, r: 18 }],
                    backgroundColor: "rgba(18, 83, 121, 0.8)",
                    borderColor: "#125379"
                },
                {
                    label: "Informatica e Acessorios",
                    data: [{ x: 7827, y: 116.5, r: 16 }],
                    backgroundColor: "rgba(129, 151, 172, 0.8)",
                    borderColor: "#8197AC"
                },
                {
                    label: "Esporte e Lazer",
                    data: [{ x: 8641, y: 114.3, r: 17 }],
                    backgroundColor: "rgba(80, 192, 174, 0.8)",
                    borderColor: "#50C0AE"
                },
                {
                    label: "Moveis e Decoracao",
                    data: [{ x: 8334, y: 87.5, r: 14 }],
                    backgroundColor: "rgba(12, 65, 101, 0.8)",
                    borderColor: "#0C4165"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: { color: "#CBD5E1" }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const raw = context.raw;
                            return context.dataset.label + " | Volume: " + raw.x.toLocaleString() + " itens | Ticket: R$ " + raw.y.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: "Volume de Itens Vendidos", color: "#8197AC" },
                    grid: { color: "rgba(129, 151, 172, 0.15)" }
                },
                y: {
                    title: { display: true, text: "Ticket Medio por Pedido (R$)", color: "#8197AC" },
                    grid: { color: "rgba(129, 151, 172, 0.15)" }
                }
            }
        }
    });

    // 5. Grafico de Pareto de Sellers
    const ctxPareto = document.getElementById("chartSellerPareto").getContext("2d");
    chartParetoInstance = new Chart(ctxPareto, {
        type: "bar",
        data: {
            labels: ["Top 5% Sellers", "Top 10% Sellers", "Top 20% Sellers", "Top 50% Sellers", "Demais Sellers (Long Tail)"],
            datasets: [
                {
                    type: "line",
                    label: "% Acumulado da Receita",
                    data: [42, 65, 82, 94, 100],
                    borderColor: "#50C0AE",
                    backgroundColor: "#50C0AE",
                    borderWidth: 3,
                    yAxisID: "y1",
                    pointRadius: 5
                },
                {
                    type: "bar",
                    label: "Faturamento do Grupo (R$ Milhoes)",
                    data: [6.64, 3.64, 2.69, 1.89, 0.96],
                    backgroundColor: "#125379",
                    borderRadius: 4,
                    yAxisID: "y"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "bottom", labels: { color: "#CBD5E1" } }
            },
            scales: {
                y: {
                    type: "linear",
                    position: "left",
                    title: { display: true, text: "Faturamento (R$ M)", color: "#8197AC" },
                    grid: { color: "rgba(129, 151, 172, 0.15)" }
                },
                y1: {
                    type: "linear",
                    position: "right",
                    min: 0,
                    max: 100,
                    title: { display: true, text: "% Acumulado", color: "#50C0AE" },
                    grid: { display: false },
                    ticks: { callback: value => value + "%" }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // 6. Ticket Medio por Seller
    const ctxSellerTicket = document.getElementById("chartSellerTicket").getContext("2d");
    chartSellerTicketInstance = new Chart(ctxSellerTicket, {
        type: "bar",
        data: {
            labels: ["Seller 4869f7 (Relogios)", "Seller 53243f (Informatica)", "Seller fa1c31 (Ferramentas)", "Seller 7c67e1 (Moveis)", "Seller 1f50f9 (Beleza)", "Seller 656021 (Cama Banho)"],
            datasets: [{
                label: "Ticket Medio por Pedido (R$)",
                data: [486.50, 412.30, 318.90, 168.40, 78.20, 54.10],
                backgroundColor: ["#50C0AE", "#50C0AE", "#125379", "#125379", "#8197AC", "#8197AC"],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return " Ticket Medio: R$ " + context.raw.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: { callback: value => "R$ " + value },
                    grid: { color: "rgba(129, 151, 172, 0.15)" }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // 7. Top Sellers por Volume de Itens
    const ctxSellerVol = document.getElementById("chartSellerVolume").getContext("2d");
    chartSellerVolInstance = new Chart(ctxSellerVol, {
        type: "bar",
        data: {
            labels: ["Seller 656021", "Seller 4a3ca9", "Seller 1f50f9", "Seller cc419e", "Seller da8622"],
            datasets: [{
                label: "Itens Expedidos",
                data: [2033, 1987, 1931, 1776, 1550],
                backgroundColor: "#8197AC",
                borderColor: "#0C4165",
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    grid: { color: "rgba(129, 151, 172, 0.15)" }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // 8. Lead Time Logistico vs Nota de Avaliacao
    const ctxDelivery = document.getElementById("chartDeliveryVsRating").getContext("2d");
    chartDeliveryInstance = new Chart(ctxDelivery, {
        type: "line",
        data: {
            labels: ["Ate 3 dias", "4 a 7 dias", "8 a 12 dias", "13 a 18 dias", "19 a 25 dias", "Mais de 25 dias (Atraso)"],
            datasets: [{
                label: "Nota Media CSAT",
                data: [4.72, 4.58, 4.31, 3.85, 3.12, 1.65],
                borderColor: "#50C0AE",
                backgroundColor: "rgba(80, 192, 174, 0.15)",
                fill: true,
                tension: 0.3,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return " CSAT Medio: " + context.raw.toFixed(2) + " estrelas";
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 1.0,
                    max: 5.0,
                    grid: { color: "rgba(129, 151, 172, 0.15)" }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Funcao para Filtragem Global por Ano
function filtrarAno(ano) {
    const botoes = document.querySelectorAll(".btn-year");
    botoes.forEach(btn => {
        if (btn.getAttribute("data-year") === ano) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    const dataset = dadosPorAno[ano];
    if (!dataset) return;

    // Atualiza KPIs
    document.getElementById("kpiFaturamento").innerText = dataset.faturamento;
    document.getElementById("kpiFaturamentoSub").innerText = dataset.faturamentoSub;
    document.getElementById("kpiYoYFaturamento").innerText = dataset.yoyFaturamento;

    document.getElementById("kpiVolume").innerText = dataset.volume;
    document.getElementById("kpiVolumeSub").innerText = dataset.volumeSub;
    document.getElementById("kpiYoYVolume").innerText = dataset.yoyVolume;

    document.getElementById("kpiTicketMedio").innerText = dataset.ticket;
    document.getElementById("kpiTicketSub").innerText = dataset.ticketSub;

    document.getElementById("kpiNotaMedia").innerText = dataset.nota;
    document.getElementById("kpiNotaSub").innerText = dataset.notaSub;

    // Atualiza Graficos de Categorias
    if (chartCatRevInstance) {
        chartCatRevInstance.data.labels = dataset.categoriesRevenue.labels;
        chartCatRevInstance.data.datasets[0].data = dataset.categoriesRevenue.data;
        chartCatRevInstance.update();
    }

    if (chartCatVolInstance) {
        chartCatVolInstance.data.labels = dataset.categoriesVolume.labels;
        chartCatVolInstance.data.datasets[0].data = dataset.categoriesVolume.data;
        chartCatVolInstance.update();
    }

    if (chartCatRatInstance) {
        chartCatRatInstance.data.labels = dataset.categoriesRating.labels;
        chartCatRatInstance.data.datasets[0].data = dataset.categoriesRating.data;
        chartCatRatInstance.update();
    }
}

// Catalogo de Codigos DAX Interativo
const daxSnippets = {
    faturamento: `// 1. FATURAMENTO E RECEITA
Faturamento Total = 
SUM(ft_pedidos_itens[price])

Faturamento com Frete = 
SUM(ft_pedidos_itens[valor_total_item])

Total Frete = 
SUM(ft_pedidos_itens[freight_value])

Percentual Frete sobre Faturamento = 
DIVIDE([Total Frete], [Faturamento Total], 0)`,

    volume: `// 2. VOLUME E OPERACAO
Volume Itens Vendidos = 
COUNTROWS(ft_pedidos_itens)

Quantidade Pedidos Unicos = 
DISTINCTCOUNT(ft_pedidos_itens[order_id])

Quantidade Sellers Ativos = 
DISTINCTCOUNT(ft_pedidos_itens[seller_id])

Itens por Pedido = 
DIVIDE([Volume Itens Vendidos], [Quantidade Pedidos Unicos], 0)`,

    ticket: `// 3. TICKET MEDIO
Ticket Medio por Seller = 
DIVIDE([Faturamento Total], DISTINCTCOUNT(ft_pedidos_itens[order_id]), 0)

Ticket Medio por Pedido = 
DIVIDE([Faturamento Total], [Quantidade Pedidos Unicos], 0)

Ticket Medio por Item = 
DIVIDE([Faturamento Total], [Volume Itens Vendidos], 0)`,

    avaliacao: `// 4. SATISFACAO E AVALIACOES (REVIEWS)
Total Avaliacoes = 
CALCULATE(
    COUNTROWS(dm_avaliacoes),
    TREATAS(VALUES(ft_pedidos_itens[order_id]), dm_avaliacoes[order_id])
)

Nota Media Avaliacao = 
CALCULATE(
    AVERAGE(dm_avaliacoes[review_score]),
    TREATAS(VALUES(ft_pedidos_itens[order_id]), dm_avaliacoes[order_id])
)

Taxa Satisfacao Clientes = 
DIVIDE([Total Avaliacoes Promotores], [Total Avaliacoes], 0)`,

    rankings: `// 5. RANKINGS DINAMICOS POR ANO
Rank Categoria Faturamento = 
IF(
    ISINSCOPE(dm_produtos[categoria_formatada]),
    RANKX(
        ALLSELECTED(dm_produtos[categoria_formatada]),
        [Faturamento Total],
        ,
        DESC,
        Dense
    )
)

Rank Seller Faturamento = 
IF(
    ISINSCOPE(dm_sellers[seller_id]) || ISINSCOPE(dm_sellers[seller_short_id]),
    RANKX(
        ALLSELECTED(dm_sellers[seller_id]),
        [Faturamento Total],
        ,
        DESC,
        Dense
    )
)`,

    yoy: `// 6. TIME INTELLIGENCE (YEAR OVER YEAR)
Faturamento Ano Anterior = 
CALCULATE(
    [Faturamento Total],
    SAMEPERIODLASTYEAR(dm_calendario[data])
)

Crescimento Faturamento YoY = 
VAR FaturamentoAtual = [Faturamento Total]
VAR FaturamentoPassado = [Faturamento Ano Anterior]
RETURN
IF(
    NOT ISBLANK(FaturamentoPassado) && FaturamentoPassado > 0,
    DIVIDE(FaturamentoAtual - FaturamentoPassado, FaturamentoPassado, 0),
    BLANK()
)`
};

function mostrarCodigoDax(chave) {
    const tabs = document.querySelectorAll(".dax-tab");
    tabs.forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");

    const codeBlock = document.getElementById("daxCodeBlock");
    if (daxSnippets[chave]) {
        codeBlock.innerText = daxSnippets[chave];
    }
}
