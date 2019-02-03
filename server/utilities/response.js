class Response {
  static validData(res, code, data) {
    return res.status(code).json({
      status: code,
      data,
    });
  }

  static errorData(res, code, message) {
    return res.status(code).json({
      status: code,
      error: message,
    });
  }
}

export default Response;
