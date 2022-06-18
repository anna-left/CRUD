const HTTP_STATUS_CODES = {
  OK: 200,
  REQUEST_WAS_SUCCESSFUL: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const HTTP_RESPONS_MESSAGES = {
  INVALID_DATA: JSON.stringify({ message: "Invalid data in request" }),
  INTERNAL_SERVER_ERROR: JSON.stringify({ message: "Internal Server Error" }),
  INVALID_UUID_FORMAT: JSON.stringify({ message: "Invalid uuid format" }),
  USER_NOT_FOUND: JSON.stringify({ message: "User not found" }),
  INCORRECT_FIELDS: JSON.stringify({ message: "Incorrect data" }),
  REQUIRED_FIELDS_ARE_NOT_FILLED: JSON.stringify({
    message: "Required fields are not filled",
  }),
};

export { HTTP_STATUS_CODES, DEFAULT_HEADERS, HTTP_RESPONS_MESSAGES };
