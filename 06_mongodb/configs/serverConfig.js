const serverConfig = {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017',
  appName: process.env.PROJECT_NAME ?? 'Default name',
  port: process.env.PORT ? +process.env.PORT : 3000,
  environment: process.env.NODE_ENV ?? 'development',
};

module.exports = serverConfig;
