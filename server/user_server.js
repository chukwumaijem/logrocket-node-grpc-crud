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

var usersProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require('uuid');

const server = new grpc.Server();
const users = [
  {
    id: 'a68b823c-7ca6-44bc-b721-fb4d5312cafc',
    name: 'User Bolton',
    age: 23,
    address: 'Address 1',
  },
  {
    id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92b7',
    name: 'User Anne',
    age: 45,
    address: 'Address 2',
  },
];

server.addService(usersProto.UsersService.service, {
  getAll: (_, callback) => {
    callback(null, { users, success: true });
  },

  get: (call, callback) => {
    let user = users.find((n) => n.id == call.request.id);

    if (user) {
      callback(null, user);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found',
      });
    }
  },

  insert: (call, callback) => {
    let user = call.request;

    user.id = uuidv4();
    users.push(user);
    callback(null, user);
  },

  update: (call, callback) => {
    let existingUser = users.find((n) => n.id == call.request.id);

    if (existingUser) {
      existingUser.name = call.request.name;
      existingUser.age = call.request.age;
      existingUser.address = call.request.address;
      callback(null, existingUser);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found',
      });
    }
  },

  remove: (call, callback) => {
    let existingUserIndex = users.findIndex((n) => n.id == call.request.id);

    if (existingUserIndex != -1) {
      users.splice(existingUserIndex, 1);
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found',
      });
    }
  },
});

server.bind('127.0.0.1:30044', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:30044');
server.start();
