const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8000;

// CORS 미들웨어 추가
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// JSON 파싱 미들웨어 추가
app.use(express.json());

// Mock 데이터
const news = [
  {
    id: "news_123456789",
    stockInfo: {
      ticker: "AAPL",
      name: "Apple Inc.",
      exchange: "NASDAQ"
    },
    publishedAt: "2025-09-15T13:45:00Z",
    collectedAt: "2025-09-15T13:45:10Z",
    source: {
      name: "Bloomberg",
      url: "https://www.bloomberg.com/news/..."
    },
    title: {
      original: "Apple Unveils New AI Features for iPhone 17",
      translated: "애플, 아이폰 17을 위한 새로운 AI 기능 공개"
    },
    summary: {
      oneLiner: "Apple announced new AI features for the upcoming iPhone 17, focusing on personalization.",
      content: "New on-device AI model 'Apple Brain' for enhanced privacy. Integration with third-party apps through a new API. Significant camera improvements powered by computational photography."
    },
    summary_translate: {
      oneLiner_ko: "애플, 개인화에 초점을 맞춘 차기 아이폰 17의 새로운 AI 기능 발표.",
      content_ko: "향상된 개인정보 보호를 위한 새로운 온디바이스 AI 모델 '애플 브레인'. 새로운 API를 통한 서드파티 앱과의 통합. 컴퓨테이셔널 포토그래피 기술을 통한 대대적인 카메라 성능 개선."
    },
    analysis: {
      sentiment: {
        score: 0.85,
        label: "Positive"
      },
      keywords: ["AI", "iPhone 17", "Apple Brain", "Privacy"],
      relatedStocks: ["GOOGL", "MSFT"]
    }
  }
];

const filings = [
  {
    id: "filing_987654321",
    stockInfo: {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      exchange: "NASDAQ"
    },
    filingDate: "2025-08-20",
    periodOfReport: "2025-07-31",
    filingType: "10-Q",
    title: {
      original: "Quarterly report pursuant to Section 13 or 15(d)",
      translated: "13 또는 15(d)항에 따른 분기 보고서"
    },
    documentUrl: "https://www.sec.gov/Archives/edgar/data/...",
    content: {
      riskFactors: {
        original_full: "Our business is subject to various risks, including intense competition in the markets for our AI and GPU products...",
        summary_original: "Key risks include: 1) Intense competition in the AI chip market impacting margins. 2) Heavy reliance on single-source suppliers like TSMC...",
        summary_translated: "주요 리스크 요인: 1) AI 칩 시장의 치열한 경쟁으로 인한 마진 영향. 2) TSMC 등 단일 공급업체에 대한 높은 의존도에 따른 공급망 리스크..."
      },
      managementDiscussion: {
        original_full: "For the quarter ended July 31, 2025, our revenue grew to $25.8 billion, an increase of 34% year-over-year...",
        summary_original: "The Data Center segment was the primary growth engine, driven by robust demand for generative AI workloads...",
        summary_translated: "데이터센터 부문이 생성형 AI 워크로드의 강력한 수요에 힘입어 핵심 성장 동력으로 작용했습니다..."
      }
    }
  }
];

const earningsCalls = [
  {
    id: "ec_025937",
    stockInfo: {
      ticker: "TSLA",
      name: "Tesla, Inc.",
      exchange: "NASDAQ"
    },
    callTimestamp: "2025-10-22T21:30:00Z",
    fiscalPeriod: "Q3 2025",
    highlights: {
      overallSummary: {
        original: "Management emphasized progress on the Cybertruck production ramp, targeting volume production by the end of next year...",
        translated: "경영진은 사이버트럭 생산 램프업(ramp-up)의 진전을 강조하며, 내년 말까지 대량 생산 체제에 도달하는 것을 목표로 하고 있다고 밝혔습니다..."
      },
      keyQnA: [
        {
          question: "What is the updated timeline for the Cybertruck production ramp?",
          answer: "We are targeting a volume production run rate by the end of next year...",
          questioner: "Adam Jonas - Morgan Stanley"
        }
      ],
      toneAnalysis: {
        overall: "Cautiously Optimistic",
        ceoTone: "Confident",
        cfoTone: "Neutral"
      }
    },
    transcript: [
      {
        sequence: 1,
        speaker: {
          name: "Martin Viecha",
          role: "VP of Investor Relations"
        },
        text: {
          original: "Good afternoon, everyone, and welcome to Tesla's third quarter 2025 Q&A webcast.",
          translated: "안녕하십니까, 여러분. 테슬라의 2025년 3분기 Q&A 웹캐스트에 오신 것을 환영합니다."
        }
      }
    ]
  }
];

const aiReports = [
  {
    reportId: "report_pep_20250716",
    reportDate: "2025-07-16",
    stockInfo: {
      ticker: "PEP",
      name: "PepsiCo, Inc.",
      industry: "Consumer Staples"
    },
    analysisSections: {
      investmentPoints: {
        title: "투자 키포인트",
        content: "펩시코는 게토레이와 라이프워터 등 웰빙 음료에 대한 투자를 강화하며 건강을 중시하는 소비자 트렌드에 적극 대응하고 있습니다..."
      },
      earningsCallHighlights: {
        title: "어닝콜 하이라이트",
        summary: "펩시코는 2025년 1분기 실적발표에서 국제 사업 부문이 견조한 성장세를 이어가고 있으며...",
        sourceCallId: "call_pep_q1_2025"
      },
      riskAssessment: {
        title: "리스크 평가",
        points: [
          "전반적인 소비자 심리 위축과 가처분 소득 감소로 인해 특히 북미 프리토레이 사업부에서 판매량 감소 등 어려움을 겪고 있습니다...",
          "경쟁 심화와 함께 원재료 및 운송 비용 상승, 그리고 잠재적인 관세 영향은 지속적인 원가 압박 요인으로 작용하고 있습니다..."
        ]
      },
      recentNewsSummary: {
        title: "신사업 뉴스요약",
        summary: "펩시코는 최근 건강기능성 음료 브랜드 '파피(poppi)'를 19억 5천만 달러에 인수하며...",
        sourceNewsIds: ["news_pep_20250710_poppi", "news_pep_20250628_aws", "news_pep_20250615_esg"]
      },
      executiveSummary: {
        title: "Executive Summary",
        summary: "어려운 시장 환경 속 웰빙·국제 사업으로 성장 돌파구 모색, 배당 매력은 유효..."
      }
    },
    upcomingEvents: [
      {
        date: "2025-07-17",
        eventType: "EarningsCall",
        description: "2분기 실적 발표"
      }
    ],
    sourceDataIds: {
      news: ["news_pep_20250710_poppi", "news_pep_20250628_aws", "news_pep_20250615_esg"],
      filings: ["filing_pep_2025_10Q_q1"],
      earningsCalls: ["call_pep_q1_2025"]
    }
  }
];

const stocks = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    industry: "Technology"
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    exchange: "NASDAQ",
    industry: "Technology"
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    exchange: "NASDAQ",
    industry: "Automotive"
  },
  {
    ticker: "PEP",
    name: "PepsiCo, Inc.",
    exchange: "NASDAQ",
    industry: "Consumer Staples"
  }
];

// 유틸리티 함수들
const paginate = (data, limit = 10, offset = 0) => {
  const start = parseInt(offset);
  const end = start + parseInt(limit);
  return {
    data: data.slice(start, end),
    total: data.length,
    limit: parseInt(limit),
    offset: start
  };
};

const findById = (data, id) => data.find(item => item.id === id || item.reportId === id);
const findByTicker = (data, ticker) => data.filter(item => item.stockInfo?.ticker === ticker);

// API 라우트 구현

// News APIs
app.get('/news', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const result = paginate(news, limit, offset);
  res.json(result);
});

app.get('/news/:id', (req, res) => {
  const newsItem = findById(news, req.params.id);
  if (!newsItem) {
    return res.status(404).json({
      error: "뉴스를 찾을 수 없습니다",
      message: `ID ${req.params.id}에 해당하는 뉴스가 존재하지 않습니다.`
    });
  }
  res.json(newsItem);
});

app.get('/news/stock/:ticker', (req, res) => {
  const newsByTicker = findByTicker(news, req.params.ticker);
  res.json({
    data: newsByTicker,
    ticker: req.params.ticker
  });
});

// Filings APIs
app.get('/filings', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const result = paginate(filings, limit, offset);
  res.json(result);
});

app.get('/filings/:id', (req, res) => {
  const filing = findById(filings, req.params.id);
  if (!filing) {
    return res.status(404).json({
      error: "공시를 찾을 수 없습니다",
      message: `ID ${req.params.id}에 해당하는 공시가 존재하지 않습니다.`
    });
  }
  res.json(filing);
});

app.get('/filings/stock/:ticker', (req, res) => {
  const filingsByTicker = findByTicker(filings, req.params.ticker);
  res.json({
    data: filingsByTicker,
    ticker: req.params.ticker
  });
});

// Earnings Calls APIs
app.get('/earnings-calls', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const result = paginate(earningsCalls, limit, offset);
  res.json(result);
});

app.get('/earnings-calls/:id', (req, res) => {
  const earningsCall = findById(earningsCalls, req.params.id);
  if (!earningsCall) {
    return res.status(404).json({
      error: "어닝콜을 찾을 수 없습니다",
      message: `ID ${req.params.id}에 해당하는 어닝콜이 존재하지 않습니다.`
    });
  }
  res.json(earningsCall);
});

app.get('/earnings-calls/stock/:ticker', (req, res) => {
  const earningsCallsByTicker = findByTicker(earningsCalls, req.params.ticker);
  res.json({
    data: earningsCallsByTicker,
    ticker: req.params.ticker
  });
});

// AI Reports APIs
app.get('/reports', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const result = paginate(aiReports, limit, offset);
  res.json(result);
});

app.get('/reports/:id', (req, res) => {
  const report = findById(aiReports, req.params.id);
  if (!report) {
    return res.status(404).json({
      error: "리포트를 찾을 수 없습니다",
      message: `ID ${req.params.id}에 해당하는 리포트가 존재하지 않습니다.`
    });
  }
  res.json(report);
});

app.get('/reports/stock/:ticker', (req, res) => {
  const reportsByTicker = aiReports.filter(report => report.stockInfo.ticker === req.params.ticker);
  res.json({
    data: reportsByTicker,
    ticker: req.params.ticker
  });
});

// Stocks APIs
app.get('/stocks', (req, res) => {
  res.json({ data: stocks });
});

app.get('/stocks/:ticker', (req, res) => {
  const stock = stocks.find(s => s.ticker === req.params.ticker);
  if (!stock) {
    return res.status(404).json({
      error: "종목을 찾을 수 없습니다",
      message: `티커 ${req.params.ticker}에 해당하는 종목이 존재하지 않습니다.`
    });
  }
  res.json(stock);
});

// 루트 경로 추가
app.get('/', (req, res) => {
  res.json({
    message: "Mock API Server is running!",
    version: "1.0.0",
    endpoints: {
      news: "/news",
      filings: "/filings", 
      earningsCalls: "/earnings-calls",
      reports: "/reports",
      stocks: "/stocks",
      swaggerUI: "/api-docs"
    }
  });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Mock API 서버가 http://localhost:${port} 에서 실행 중입니다.`);
  console.log(`Swagger UI는 http://localhost:${port}/api-docs 에서 확인하세요.`);
  console.log(`사용 가능한 엔드포인트:`);
  console.log(`- GET /`);
  console.log(`- GET /news`);
  console.log(`- GET /stocks`);
  console.log(`- GET /api-docs`);
});