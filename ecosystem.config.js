module.exports = {
  apps : [{
    name: "shipment-service",
    script: "./build/server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}