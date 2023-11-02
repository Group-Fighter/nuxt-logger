import { NitroAppPlugin } from "nitropack";
import { getRequestURL } from "h3";
import { type LoggerOptions } from "../../../types";
import { getLogger } from "../../winstonLogger";
import { formatString, consoleLogWithColor, getColorCode } from "../../utils";
// @ts-ignore
import { useRuntimeConfig } from '#imports';
// @ts-ignore
export default defineNitroPlugin<NitroAppPlugin>((nitroApp) => {
  const options = useRuntimeConfig().public.logger as LoggerOptions;
  const globalLogger = getLogger(options);

  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const pathname: string = String(getRequestURL(event));
    const path: string = event.path;
    const headers: Record<string, string> = event.node.req.headers;
    const method: string = event.method;

    // You can add additional condition for logging, if needed
    if (pathname && !pathname.includes("_nuxt")) {
      const formattedMessage = formatString(`\nAccessed %s\nurl= %s\nmethod= %s\nheaders= %s`, pathname, path, method, JSON.stringify(headers));
      globalLogger.log("info", formattedMessage);
      const consoleMessage = consoleLogWithColor(formattedMessage, "info", getColorCode("fgCyan"));
      console.log(consoleMessage);
    }
  });

  console.log("Logger route setup complete");

  // Handle errors gracefully, if any, e.g., by adding a try-catch block.
  // nitroApp.hooks.hook("render:response", (response, { event }) => {
  //   try {
  //     // Your code here
  //   } catch (error) {
  //     logger.error(`Error in render:response: ${error.message}`);
  //   }
  // });
});
