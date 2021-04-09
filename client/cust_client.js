const { join } = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTOS = require('protos');

const PROTO_PATH = join(PROTOS, 'customers.proto');

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;
const client = new CustomerService(
	"localhost:30043",
	grpc.credentials.createInsecure()
);

module.exports = client;
