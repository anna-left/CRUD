import { IncomingMessage } from "http";

function getPostData(request: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let requestBody = "";

      request.on("data", (chunk) => {
        requestBody += chunk.toString();
      });

      request.on("end", () => {
        resolve(requestBody);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export { getPostData };
