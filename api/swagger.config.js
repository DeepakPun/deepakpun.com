const swaggerConfig = {
  swagger: "2.0",
  info: {
    title: "Deepak Pun | MERN Stack API",
    description: "Professional API documentation for my MERN projects.",
    version: "1.0.0"
  },
  // Dynamic host based on environment
  host: process.env.NODE_ENV === 'production'
    ? "deepakpun.com:3001"     // Production host
    : "localhost:3001",        // Development host
  basePath: "/",
  schemes: ["http", "https"],
  paths: {
    // Copy all your existing paths from swagger.json here
    "/health": {
      "get": {
        "description": "",
        "responses": {
          "200": { "description": "OK" },
          "503": { "description": "Service Unavailable" }
        }
      }
    },
    "/api/v1/projects/": {
      "get": {
        "description": "",
        // ... your existing parameters
      }
    }
    // ... add all your other paths
  }
};

export default swaggerConfig
