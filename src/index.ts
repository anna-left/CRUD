import cluster from "cluster";
import { cpus } from "os";
import "dotenv/config";

import { server } from "./server";

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
  } else {
    server.listen(PORT, "127.0.0.1", () => {
      console.log(
        `API is listening on http://localhost:${PORT} on ${process.pid}`
      );
    });
  }
} else {
  server.listen(PORT, "127.0.0.1", () => {
    console.log(`Сервер начал прослушивание запросов на ${PORT}`);
  });
}