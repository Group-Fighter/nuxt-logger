import path from "path";
import *  as  winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { type LoggerOptions } from "../types";
const { createLogger, format } = winston

export const getLogger = (options: LoggerOptions) => {
  const customFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.align(),
    format.printf((i) => `${[i.timestamp]} [${i.level}] : ${i.message}`),
  );

  const maxSize = options.maxSize;
  const maxFiles = options.maxFiles;
  const fullInfoPath = path.join(options.infoLogPath, options.infoLogName);
  const fullerrorPath = path.join(options.errorLogPath, options.errorLogName);

  const defaultOptions = {
    format: customFormat,
    datePattern: "YYYY-MM-DD",
    zippedArchive: options.zippedArchive,
    maxSize,
    maxFiles,
  };

  const transportInfo: DailyRotateFile = new DailyRotateFile({
    filename: fullInfoPath,
    level: "info",
    ...defaultOptions,
  });

  const transportError: DailyRotateFile = new DailyRotateFile({
    filename: fullerrorPath,
    level: "error",
    ...defaultOptions,
  });


  const globalLogger = createLogger({
    format: customFormat,
    transports: [
      transportInfo,
      transportError
    ],
  });
  return globalLogger;
};
