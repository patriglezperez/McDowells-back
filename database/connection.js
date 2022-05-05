const {Client} = require("pg");

const connectionClient = new Client ({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "1234",
    port: 5432
})

const mcdowellClient = new Client(connectionClient);
connectionClient.connect();

module.exports = mcdowellClient;