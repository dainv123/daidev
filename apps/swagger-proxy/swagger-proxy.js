const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Serve static Swagger UI
app.use('/swagger-static', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));

// Proxy API requests to the backend
app.use('/api', createProxyMiddleware({
  target: 'http://api:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api/v1'
  }
}));

// Proxy docs-json endpoint
app.use('/docs-json', createProxyMiddleware({
  target: 'http://api:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/docs-json': '/docs-json'
  }
}));

// Serve custom Swagger UI HTML at /
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DaiDev API Documentation (Proxy)</title>
    <link rel="stylesheet" type="text/css" href="/swagger-static/swagger-ui.css" />
    <link rel="icon" type="image/png" href="/swagger-static/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/swagger-static/favicon-16x16.png" sizes="16x16" />
    <style>
        html { box-sizing: border-box; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
    </style>
</head>
<body>
<div id="swagger-ui"></div>
<script src="/swagger-static/swagger-ui-bundle.js" charset="UTF-8"> </script>
<script src="/swagger-static/swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
<script>
window.onload = function() {
    const ui = SwaggerUIBundle({
        url: '/docs-json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
    });
};
</script>
</body>
</html>
  `);
});

app.listen(4001, () => {
  console.log('Swagger Proxy UI running at http://localhost:4001/');
});