const { join } = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { PROTO_PATH, protoEnvs } = require('protos');
const { USER_SERVICE } = protoEnvs[process.env.NODE_ENV];

const packageDefinition = protoLoader.loadSync(join(PROTO_PATH, 'users.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const UsersService = grpc.loadPackageDefinition(packageDefinition).UsersService;
const client = new UsersService(
  USER_SERVICE,
  grpc.credentials.createInsecure()
);

module.exports = client;
