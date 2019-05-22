var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/node-testing',
  test: 'mongodb+srv://admin:a123456@cluster0-wp2ii.mongodb.net/test?retryWrites=true'
};

module.exports = config;
