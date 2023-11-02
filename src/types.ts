export interface LoggerOptions {
  zippedArchive: boolean;
  maxSize: string;
  maxFiles: string;
  infoLogPath: string;
  infoLogName: string;
  errorLogPath: string;
  errorLogName: string;
}

export interface ModuleOptions {
  isEnabled: boolean;
  zippedArchive: boolean;
  logLevel: string;
  maxSize: string;
  maxFiles: string;
  infoLogPath: string;
  infoLogName: string;
  errorLogPath: string;
  errorLogName: string;
  skipRequestMiddlewareHandler: boolean;
}
