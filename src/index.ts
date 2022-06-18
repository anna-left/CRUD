import "dotenv/config";

import { server } from "./server";

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Сервер начал прослушивание запросов на ${PORT}`);
});
