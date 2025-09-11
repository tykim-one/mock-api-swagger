# Mock API with Swagger Documentation

주식 관련 뉴스, 공시, 어닝콜, AI 리포트를 제공하는 Mock API 서버입니다.

## 🚀 배포된 서버

- **API 서버**: https://mock-api-swagger.railway.app
- **Swagger UI**: https://mock-api-swagger.railway.app/api-docs

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

## 🆓 Render로 무료 배포하기

1. GitHub 저장소 준비
   - 새 저장소를 만들고 코드를 푸시하세요.
   ```bash
   git init
   git add .
   git commit -m "chore: initial"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

2. Render에 배포 (무료 플랜)
   - `render.yaml`가 포함되어 있으므로 Render 대시보드에서 다음을 수행하세요:
   - Render 로그인 → New + → Blueprint → GitHub 저장소 선택 → Deploy Blueprint
   - 서비스 이름을 `mock-api-swagger`로 설정(선택) 후 생성
   - 최초 배포가 완료되면 제공된 도메인으로 접속합니다.

3. 확인
   - 헬스체크: `https://<서비스-도메인>/test`
   - Swagger UI: `https://<서비스-도메인>/api-docs`

4. 참고
   - PORT는 Render가 자동으로 주입합니다(코드는 `process.env.PORT` 사용).
   - CORS가 활성화되어 있어 브라우저에서 바로 호출 가능합니다.
   - 문제가 있으면: Logs 탭 확인 → 재배포 또는 `buildCommand/startCommand` 점검(`npm install` / `npm start`).

