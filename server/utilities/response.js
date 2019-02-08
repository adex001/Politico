class Response {
  /**
     * @function validData
     * @res response object
     * @code Status code
     * @data the returned data
     * @returns {*} the response object
     */
  static validData(res, code, data) {
    return res.status(code).json({
      status: code,
      data,
    });
  }

  /**
     * @function errorData
     * @res response object
     * @code Status code
     * @message the error message
     * @returns {*} the response object
     */
  static errorData(res, code, message) {
    return res.status(code).json({
      status: code,
      error: message,
    });
  }
}

export default Response;
