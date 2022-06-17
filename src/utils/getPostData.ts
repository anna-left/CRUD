import { IncomingMessage } from "http";
import { IUser } from "../interfaces/interfaces";

function getPostData(request: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let requestBody = "";

      request.on("data", (chunk) => {
        requestBody += chunk.toString();
      });

      request.on("end", () => {
        try {
          resolve(requestBody);
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export { getPostData };
