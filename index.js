const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // 3단계에서 만들 파일

const app = express();
const port = 8000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Mock API 서버가 http://localhost:${port} 에서 실행 중입니다.`);
  console.log(`Swagger UI는 http://localhost:${port}/api-docs 에서 확인하세요.`);
});