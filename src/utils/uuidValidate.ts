import { validate } from "uuid";
import { version } from "uuid";

export const uuidValidate = (uuid: string): boolean => {
  return validate(uuid) && version(uuid) === 4;
};
