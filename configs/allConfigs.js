function getConfig() {
  return {
    PORT: process.env.PORT,
    authinticationDomain: process.env.AUTH0_DOMAIN,
    AtlasDataBaseConnection: process.env.MONGO_DB_CONNECTION,
    AUTH0_API_ID : process.env.AUTH0_API_ID,
    AUTH0_AUDIENCE:process.env.AUTH0_AUDIENCE,
    ConnectionParameters: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  };
}
module.exports = getConfig;

