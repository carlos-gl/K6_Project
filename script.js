
import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter, Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Configuração de opções do K6
export let options = {
  stages: [
    { duration: '1m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const requestCount = new Counter('request_count');
const responseTimeTrend = new Trend('response_time');

export default function () {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  let res = http.get(url);

  // Verifica se a resposta foi 200 e se o tempo foi inferior a 500ms
  check(res, {
    'status code é 200': (r) => r.status === 200,
    'tempo de resposta abaixo de 500ms': (r) => r.timings.duration < 500,
  });

  requestCount.add(1);
  responseTimeTrend.add(res.timings.duration);

  sleep(1);
}

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
