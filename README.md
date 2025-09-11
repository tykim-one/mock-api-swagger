# Mock API with Swagger Documentation

주식 관련 뉴스, 공시, 어닝콜, AI 리포트를 제공하는 Mock API 서버입니다.

## 🚀 배포된 서버

- **API 서버**: [배포 URL]
- **Swagger UI**: [배포 URL]/api-docs

## 📋 API 엔드포인트

### 뉴스 (News)
- `GET /news` - 뉴스 목록 조회
- `GET /news/:id` - 특정 뉴스 조회
- `GET /news/stock/:ticker` - 특정 종목 뉴스 조회

### 공시 (Filings)
- `GET /filings` - 공시 목록 조회
- `GET /filings/:id` - 특정 공시 조회
- `GET /filings/stock/:ticker` - 특정 종목 공시 조회

### 어닝콜 (Earnings Calls)
- `GET /earnings-calls` - 어닝콜 목록 조회
- `GET /earnings-calls/:id` - 특정 어닝콜 조회
- `GET /earnings-calls/stock/:ticker` - 특정 종목 어닝콜 조회

### AI 리포트 (AI Reports)
- `GET /reports` - AI 리포트 목록 조회
- `GET /reports/:id` - 특정 AI 리포트 조회
- `GET /reports/stock/:ticker` - 특정 종목 AI 리포트 조회

### 종목 (Stocks)
- `GET /stocks` - 종목 목록 조회
- `GET /stocks/:ticker` - 특정 종목 조회

## 🛠️ 로컬 실행

```bash
# 의존성 설치
npm install

# 서버 실행
npm start

# 또는 개발 모드
npm run dev
```

서버는 `http://localhost:8000`에서 실행됩니다.
Swagger UI는 `http://localhost:8000/api-docs`에서 확인할 수 있습니다.

## 📦 의존성

- Express.js - 웹 서버 프레임워크
- Swagger UI Express - API 문서화

