const { Client } = require("pg");

const connectionClient = {
    user: "postgres",
    host: "localhost",
    database: "mcdowells",
    password: "1234",
    port: 5432
}

const mcdowellConnection = new Client(connectionClient);
mcdowellConnection.connect();

module.exports = mcdowellConnection;