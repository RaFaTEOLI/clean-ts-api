export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://root:1234@localhost:27017/',
  port: process.env.PORT || 5050,
};
