module.exports = {
    apps: [
      {
        name: "centum-health-glance",
        exec_mode: 'cluster',
        instances: 1,
        script: '.next/standalone/server.js',
        env_production: {
            NODE_ENV: "production",
            PORT: 8000,
          },
        env_development: {
            NODE_ENV: "development",
            PORT: 3000,
          },
      },
    ],
  };