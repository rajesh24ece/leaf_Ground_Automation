import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

// Ensure logs directory exists
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

const logLevel = process.env.LOG_LEVEL ?? (process.env.CI ? "info" : "debug");

export const logger = createLogger({
  level: logLevel,
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    // Console output with colors
    new transports.Console({
      level: logLevel,
      format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
    }),

    // Info log file
    new transports.File({
      filename: path.join(logDir, "test.log"),
      level: "info",
    }),

    // Error-only log file
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
  ],
});
