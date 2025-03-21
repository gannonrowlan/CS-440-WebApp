import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

env.config();
const app = express();
const PORT = process.env.PORT || 8000;

// API Gateway routes
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://auth-service:5000",
    changeOrigin: true,
  })
);
app.use(
  "/borrow",
  createProxyMiddleware({
    target: "http://borrow-service:5001",
    changeOrigin: true,
  })
);
app.use(
  "/books",
  createProxyMiddleware({
    target: "http://books-service:5002",
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
