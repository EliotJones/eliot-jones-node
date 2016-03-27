import app from "./app";
import * as http from "http";

app.set("port", 3000);

const server = http.createServer(app);
server.listen(3000);
server.on("listening", onListening);

function onListening() {
    let address = server.address();
    
    console.info(`Now listening on ${address.port}`);
}
