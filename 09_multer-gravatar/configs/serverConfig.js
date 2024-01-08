const serverConfig = {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://dgolikova0:daryna@cluster0.lhorflz.mongodb.net/',
  appName: process.env.PROJECT_NAME ?? 'Default name',
  port: process.env.PORT ? +process.env.PORT : 3000,
  environment: process.env.NODE_ENV ?? 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'secret-phrase',
  jwtExpires: process.env.JWT_EXPIRES ?? '1d',
};

module.exports = serverConfig;
