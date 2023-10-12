import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "server.log" }), // Log to a file
  ],
});

export default logger;
