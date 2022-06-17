const HTTP_STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

const HTTP_RESPONS_MESSAGES = {
  INTERNAL_SERVER_ERROR: JSON.stringify({ message: 'Internal Server Error' }),
  INVALID_UUID_FORMAT: JSON.stringify({ message: 'Invalid uuid format' }),
  PERSON_NOT_FOUND: JSON.stringify({ message: 'user not found' }),
  REQUIRED_FIELDS_ARE_NOT_FILLED: JSON.stringify({ message: 'Required fields are not filled' }),
}

export { HTTP_STATUS_CODES, DEFAULT_HEADERS, HTTP_RESPONS_MESSAGES };
