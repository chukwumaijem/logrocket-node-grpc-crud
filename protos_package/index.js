const protoEnvs = {
  development: {
    CUSTOMER_SERVICE: 'localhost:40001',
    USER_SERVICE: 'localhost:40002',
  },
  staging: {
    CUSTOMER_SERVICE: 'localhost:40001',
    USER_SERVICE: 'localhost:40002',
  },
  production: {
    CUSTOMER_SERVICE: 'localhost:40001',
    USER_SERVICE: 'localhost:40002',
  },
};

module.exports = {
  PROTO_PATH: __dirname,
  protoEnvs,
};
