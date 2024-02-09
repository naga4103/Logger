// const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ message, label, timestamp }) => {
  return `${timestamp} [${label}] : ${message}`;
});
const productionLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), myFormat),
    // defaultMeta: { service: "user-service" },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.Console(),
      new transports.File({ filename: "myErrors.log" }),
    ],
  });
};

module.exports = productionLogger;
