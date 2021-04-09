const { join } = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { PROTO_PATH, protoEnvs } = require('protos');
const { CUSTOMER_SERVICE } = protoEnvs[process.env.NODE_ENV];

const packageDefinition = protoLoader.loadSync(
  join(PROTO_PATH, 'customers.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
  }
);

const CustomerService = grpc.loadPackageDefinition(packageDefinition)
  .CustomerService;
const client = new CustomerService(
  CUSTOMER_SERVICE,
  grpc.credentials.createInsecure()
);

module.exports = client;
