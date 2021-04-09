const { join } = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTOS = require('protos');

const PROTO_PATH = join(PROTOS, 'users.proto');

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const UsersService = grpc.loadPackageDefinition(packageDefinition).UsersService;
const client = new UsersService(
  'localhost:30044',
  grpc.credentials.createInsecure()
);

module.exports = client;
