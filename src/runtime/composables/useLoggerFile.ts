import { formatString } from "../utils";

export const useLoggerFile = () => {
  const nuxtApp = useNuxtApp();

  function logSuccess(format: string, ...message: any[]) {
    if (process?.server && nuxtApp.$globalLogger) {
      nuxtApp.$logSuccess(format, message);
    } else {
      console.info(formatString(format, ...message));
    }
  }

  function logInfo(format: string, ...message: any[]) {
    if (process?.server && nuxtApp.$globalLogger) {
      nuxtApp.$logInfo(format, message);
    } else {
      console.info(formatString(format, ...message));
    }
  }

  function logWarn(format: string, ...message: any[]) {
    if (process?.server && nuxtApp.$globalLogger) {
      nuxtApp.$logWarn(format, message);
    } else {
      console.warn(formatString(format, ...message));
    }
  }

  function logError(err: any, format: string, ...message: any[]) {
    if (process?.server && nuxtApp.$globalLogger) {
      nuxtApp.$logError(format, message);
    } else {
      console.error("We Have Encountered an ERROR: ", err);
    }
  }

  return {
    logSuccess,
    logInfo,
    logWarn,
    logError,
  };
};
