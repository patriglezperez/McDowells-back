const { Client } = require("pg");

const connectionData = {
    user: "postgres",
    host: "localhost",
    database: "mcdowells",
    password: "1234",
    port: 5432
};

function mcdowellConnection(){
    return new Client(connectionData);
}
module.exports = mcdowellConnection;