// server.mjs
import { createServer } from 'node:http';

const routes = {
  'GET /api/hello': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from API!' }));
  },
};

const server = createServer((req, res) => {
  console.log('Received request:', req.method, req.url);
  
  const routeKey = `${req.method} ${req.url}`;
  const handler = routes[routeKey];

  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
// ... existing code ...
// run with `node server.mjs`
