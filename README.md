# LogRocket Tutorial of a CRUD with gRPC and Node

This project is separated in two parts:
- Server: where gRPC serves the remote calls defined in the proto file
- Client: Express/Node/Bootstrap web page to CRUD the server operations.

In order to run this app, issue in separate command line windows:
- Inside the /client folder: `node index`
- Inside the /root folder: `npm start`

Then, go to http://localhost:3000/ and test it out.

# Extention

## The proto package
Copy the proto_package folder into your node_modules and rename it to `proto`. Update the config as desired.

## Add user service
To start the app, open three terminals
- For client: `node client/index.js`
- For Customer server: `node server/cust_server.js`
- For User server: `node server/user_server.js`
