import React from "react";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";

function ErrorPage({
  error = null,
  errorCode = "500",
  title = "Oops! Something went wrong",
  message = "We're sorry, but something unexpected happened. Please try again later.",
  showRetry = true,
  showHome = true,
  showBack = true,
  onRetry = null,
  onHome = null,
  onBack = null,
}) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = "/";
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  // Get error-specific content
  const getErrorContent = () => {
    switch (errorCode) {
      case "404":
        return {
          title: "Page Not Found",
          message:
            "The page you're looking for doesn't exist or has been moved.",
          icon: <AlertTriangle className="w-16 h-16 text-red-500" />,
        };
      case "403":
        return {
          title: "Access Denied",
          message: "You don't have permission to access this resource.",
          icon: <AlertTriangle className="w-16 h-16 text-orange-500" />,
        };
      case "500":
        return {
          title: "Server Error",
          message: "Something went wrong on our end. Please try again later.",
          icon: <AlertTriangle className="w-16 h-16 text-red-500" />,
        };
      default:
        return {
          title: title,
          message: message,
          icon: <AlertTriangle className="w-16 h-16 text-red-500" />,
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">{errorContent.icon}</div>

        {/* Error Code */}
        <div className="text-6xl font-bold text-gray-300 mb-4">{errorCode}</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {errorContent.title}
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {errorContent.message}
        </p>

        {/* Error Details (for development) */}
        {error && import.meta.env.MODE === "development" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
            <pre className="text-sm text-red-700 overflow-x-auto">
              {error.toString()}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && (
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}

          {showHome && (
            <button
              onClick={handleHome}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </button>
          )}

          {showBack && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          )}
        </div>

        {/* Additional Help */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If the problem persists, please{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
