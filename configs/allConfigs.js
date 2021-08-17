function getConfig() {
  return {
    PORT: process.env.PORT,
    authinticationDomain: process.env.AUTH0_DOMAIN,
    AtlasDataBaseConnection: process.env.MONGO_DB_CONNECTION,
    AtlasDB: process.env.MONGO_DB,
    ConnectionParameters: {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
}
module.exports = getConfig;
