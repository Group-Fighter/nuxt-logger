export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['../src/module'],
  logger: {
     // true or false, defaults to true
    isEnabled: true,
    // trace, debug, info, warn or error, defaults to debug
    logLevel: "info",
    // Maximum size of the file after which it will log
    // This can be a number of bytes, or units of kb, mb, and gb
    // If using the units, add 'k', 'm', or 'g' as the suffix. The units need to directly follow the number
    maxSize: "1g",

    // Maximum number of logs to keep. If not set, no logs will be removed. This can be a number of files or number of days
    // If using days, add 'd' as the suffix. It uses auditFile to keep track of the log files in a json format
    // It won't delete any file not contained in it. It can be a number of files or number of days
    maxFiles: "1d",

    // Path that info log files will be created in.
    // Change this to keep things neat.
    infoLogPath: `writable/logs`,

    // Name of info log file.
    // Change this to keep things tidy.
    infoLogName: `%DATE%-${process.env.NODE_ENV}-info.log`,

    // Path that error log files will be created in.
    // Change this to keep things neat.
    errorLogPath: `writable/logs`,

    // Name of error log file.
    // Change this to keep things tidy.
    errorLogName: `%DATE%-${process.env.NODE_ENV}-error.log`,

    // Set to `true` to skip auto render:html logging (level: info).
    skipRequestMiddlewareHandler: false,
  }
});
