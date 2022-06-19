import cluster from "cluster";
import { cpus } from "os";
import "dotenv/config";

import { server } from "./server";
import { LOCAL_HOST_IP } from "./utils/constants";

const PORT = Number(process.env.PORT) || 3000;
let multiMode = process.argv[2];

if (multiMode) {
  if (cluster.isPrimary === true) {
    const CPUS: any = cpus();
    console.log(`The number of host machine logical CPU cores: ${CPUS.length}`);
    console.log("--------------------------------------------------");

    CPUS.forEach(() => cluster.fork());
    cluster.on("exit", () => {
      cluster.fork();
    });
  } else {listenServer(process.pid)}
} else {listenServer()}

function listenServer(pid = 0) {
    server.listen(PORT, LOCAL_HOST_IP, () => {
      const message = !pid ? "" : ` on ${pid}`;
      console.log(`API is listening on http://localhost:${PORT}${message}`);
    });
}