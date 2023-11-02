# nuxt3 winston log

[![Npm package version](https://badgen.net/npm/v/nuxt-editorjs)](https://npmjs.com/package/nuxt-editorjs)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

Inspiration from `https://github.com/huyujienice/nuxt3-winston-log`
```
using library
https://github.com/winstonjs/winston
https://github.com/winstonjs/winston-daily-rotate-file
```

## Installation
- Run `npm i nuxt3-logger` to install from NPM.
- Change options using the `logger` key as needed. See Usage section for details.

## Configuration
Add the module to your `nuxt.config.ts`:

```js
    export default defineNuxtConfig({
      modules: ["nuxt3-logger"],
      logger: {
        isEnabled: true,
        zippedArchive: true,
        logLevel: "trace",
        // Maximum size of the file after which it will log
        // This can be a number of bytes, or units of kb, mb, and gb
        // If using the units, add 'k', 'm', or 'g' as the suffix. The units need to directly follow the number
        maxSize: "2g",
        // Maximum number of logs to keep. If not set, no logs will be removed. This can be a number of files or number of days
        // If using days, add 'd' as the suffix. It uses auditFile to keep track of the log files in a json format
        // It won't delete any file not contained in it. It can be a number of files or number of days
        maxFiles: "30d",
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
        errorLogName: `%DATE%-${process.env.NODE_ENV}-error.log`
        // Set to `true` to skip auto render:html logging (level: info).,
        skipRequestMiddlewareHandler: false,
      },
    });

```

# Usage
 ```js
    const { logError, logWarn, logInfo } = useLoggerFile();
    // Example for '%s' case
    logError("Error occurred with value: %s", "example");

    // Example for '%q' case
    logWarn("Warning message: %q", { key: "value" });

    // Example for '%x' case
    logSuccess("Hexadecimal representation: %x", 255);

    // Example for '%X' case
    logError("Hexadecimal representation (uppercase): %X", 255);

    // Example for '%d' case
    logWarn("Decimal value: %d", 123);

    // Example for '%t' case
    logInfo("String representation: %t", "example");

    // Example for '%p' case
    logError("Pointer address: %p", someObject);

    // Example for '%b' case
    logWarn("Exponential notation: %b", 123.456);

    // Example for '%e' case
    logInfo("Exponential notation: %e", 123.456);

    // Example for '%E' case
    logError("Exponential notation (uppercase): %E", 123.456);

    // Example for '%f' and '%F' cases
    logWarn("Floating-point value: %f", 12.345);
    logInfo("Floating-point value: %F", 12.345);

    // Example for '%g' case
    logError("Precision notation: %g", 0.123456);

    // Example for '%G' case
    logWarn("Precision notation (uppercase): %G", 0.123456);

    // Example for '%c' case
    logInfo("Character representation: %c", 65);

    // Example for '%o' case
    logError("Octal representation: %o", 64);

    // Example for '%O' case
    logWarn("Octal representation with '0o' prefix: %O", 64);

    // Example for '%U' case
    logInfo("Unicode representation: %U", 0x1F600);

    // Example for '%%' case
    logError("This is a literal percentage sign: %%");

    // Example for '%v' case
    logWarn("Custom representation: %v", someObject);

    // Example for '%#v' case
    logInfo("JSON representation: %#v", { key: "value" });

    // Example for '%T' case
    logError("Type of value: %T", "example");

    // or
    const nuxtApp = useNuxtApp();
    nuxtApp.logSuccess("Type of value: %T", "example");
    nuxtApp.logInfo("Type of value: %T", "example");
    nuxtApp.logError("Type of value: %T", "example");
    // or use https://github.com/winstonjs/winston#string-interpolation
    nuxtApp.globalLogger.log('info', 'test message %s', 'my string');
```
