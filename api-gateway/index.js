import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Proxy Routes for Microservices
app.use(
  "/auth-service",
  createProxyMiddleware({
    target: "http://auth-service:5000",
    changeOrigin: true,
  })
);
app.use(
  "/borrow-sevice",
  createProxyMiddleware({
    target: "http://borrow-service:5001",
    changeOrigin: true,
  })
);
app.use(
  "/book-service",
  createProxyMiddleware({
    target: "http://book-service:5002",
    changeOrigin: true,
  })
);

// Default Route
app.get("/", (req, res) => {
  res.send("API Gateway is running...");
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
