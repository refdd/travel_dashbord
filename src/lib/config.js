// Centralized configuration for the application
const config = {
  // Backend API configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",

  // Socket.IO configuration
  SOCKET_URL:
    import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000",

  // Stream Chat configuration
  STREAM_API_KEY: import.meta.env.VITE_STREAM_API_KEY || "your-stream-api-key",

  // Environment
  NODE_ENV: import.meta.env.MODE || "development",
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};

// Validation
if (!config.API_BASE_URL) {
  console.warn("VITE_API_BASE_URL is not set, using default localhost:3000");
}

if (!config.STREAM_API_KEY || config.STREAM_API_KEY === "your-stream-api-key") {
  console.warn("VITE_STREAM_API_KEY is not set, using placeholder value");
}

export default config;
