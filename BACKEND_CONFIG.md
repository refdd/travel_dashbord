# Backend URL Configuration

This document explains how to configure the backend URL for the Travel Dashboard application.

## Overview

The application now uses a centralized configuration system for all backend URLs. This makes it easy to change the backend URL for different environments (development, staging, production) without modifying code.

## Configuration Files

### 1. Central Configuration (`src/lib/config.js`)

This is the main configuration file that centralizes all backend-related URLs and settings:

```javascript
const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  SOCKET_URL:
    import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000",
  STREAM_API_KEY: import.meta.env.VITE_STREAM_API_KEY || "your-stream-api-key",
  // ... other config
};
```

### 2. Environment Variables

Create a `.env` file in the root directory with your backend URL:

```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:3000

# Socket.IO Configuration (optional, defaults to API_BASE_URL)
VITE_SOCKET_URL=http://localhost:3000

# Stream Chat Configuration
VITE_STREAM_API_KEY=your-stream-api-key
```

## How to Change Backend URL

### Method 1: Environment Variables (Recommended)

1. Create a `.env` file in the root directory
2. Add your backend URL:
   ```env
   VITE_API_BASE_URL=https://your-backend-domain.com
   ```
3. Restart the development server

### Method 2: Direct Configuration

1. Open `src/lib/config.js`
2. Change the default URL:
   ```javascript
   API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://your-backend-domain.com",
   ```

## Environment-Specific Configuration

### Development

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Staging

```env
VITE_API_BASE_URL=https://staging-api.yourdomain.com
```

### Production

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

## What Gets Updated Automatically

When you change the `VITE_API_BASE_URL`, the following components automatically use the new URL:

1. **Axios HTTP Client** (`src/lib/axios.js`) - All API calls
2. **Socket.IO Connection** (`src/context/useSocketContext.jsx`) - Real-time messaging
3. **All Store Files** - All Zustand stores that use `axiosInstance`

## Files That Use the Configuration

- `src/lib/axios.js` - HTTP client configuration
- `src/context/useSocketContext.jsx` - Socket.IO and Stream Chat configuration
- All store files in `src/stores/` - API calls through axiosInstance

## Validation

The configuration includes validation warnings:

- Warns if `VITE_API_BASE_URL` is not set
- Warns if `VITE_STREAM_API_KEY` is not properly configured

## Example Usage

```javascript
import config from "@/lib/config";

// Access the API base URL
console.log(config.API_BASE_URL);

// Check if running in development
if (config.IS_DEVELOPMENT) {
  console.log("Running in development mode");
}
```

## Troubleshooting

1. **URL not updating**: Make sure to restart the development server after changing environment variables
2. **CORS issues**: Ensure your backend allows requests from your frontend domain
3. **Socket connection fails**: Check that your backend supports Socket.IO and the URL is correct

## Security Notes

- Never commit `.env` files with production credentials
- Use different environment files for different stages (`.env.development`, `.env.production`)
- Consider using a secrets management system for production deployments
