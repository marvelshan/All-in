import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // Key configurations for spike in this section
  discardResponseBodies: true,
  stages: [
    { duration: '10s', target: 1000 }, // fast ramp-up to a high point
    // No plateau
    { duration: '3s', target: 0 }, // quick ramp-down to 0 users
  ],
};

export default () => {
  const urlRes = http.post(
    'https://www.ygolonhcet.online/odds/bet',
    JSON.stringify({
      betPoint: 3,
      id: 22200001,
      hosting: 'away',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6NDUsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QDEyMy5jb20ifSwiaWF0IjoxNzAxNjU2MzYyfQ.oUqXX7aXvujPZOz52btnxkP3yfE0n7GmteVf2yCEqtk',
      },
    },
  );
  check(urlRes, {
    'HTTP POST was successful': (r) => r.status === 200,
  });

  sleep(1);
  // MORE STEPS
  // Add only the processes that will be on high demand
  // Step1
  // Step2
  // etc.
};
