class Logger {
  static info(msg) {
    console.log("[INFO]", msg);
  }

  static error(msg) {
    console.error("[ERROR]", msg);
  }
}

module.exports = Logger;
