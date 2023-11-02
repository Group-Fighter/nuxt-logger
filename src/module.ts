import {
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
  useLogger,
} from "@nuxt/kit";
import { defu } from "defu";
import { type ModuleOptions } from "./types";

const defaults: ModuleOptions = {
  isEnabled: true,
  zippedArchive: true,
  logLevel: "trace",
  maxSize: "2g",
  maxFiles: "30d",
  infoLogPath: `writable/logs`,
  infoLogName: `%DATE%-${process.env.NODE_ENV}-info.log`,
  errorLogPath: `writable/logs`,
  errorLogName: `%DATE%-${process.env.NODE_ENV}-error.log`,
  skipRequestMiddlewareHandler: false,
} as const;

const PACKAGE_NAME = "nuxt3-logger";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: `${PACKAGE_NAME}`,
    configKey: "logger",
    compatibility: {
      bridge: false,
    },
  },
  // Default configuration options of the Nuxt module
  defaults,
  setup(moduleOptions, nuxt) {
    const logger = useLogger(PACKAGE_NAME);

    if (!moduleOptions.isEnabled) {
      logger.info(`Skipping ${PACKAGE_NAME} setup, as module is disabled`);
      return;
    }

    logger.info("Setting up logger...");

    const options = defu(moduleOptions, defaults);

    // @ts-ignore TODO: Fix this `nuxi prepare` bug (see https://github.com/nuxt/framework/issues/8728)
    nuxt.options.runtimeConfig.public.logger = options as ModuleOptions;

    const resolver = createResolver(import.meta.url);
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`

    const composables = resolver.resolve("./runtime/composables");
    addImportsDir(composables);
    // addImports({
    //   name: 'useLoggerFile',
    //   as: 'useLoggerFile',
    //   from: composables
    // })

    addPlugin({
      src: resolver.resolve("./runtime/plugins/00.logging.server"),
      mode: "server",
      ssr: true,
    });
    // addPlugin({
    //   src: resolver.resolve("./runtime/plugins/00.logging.client"),
    //   mode: "client",
    //   ssr: true,
    // });
    if (options.skipRequestMiddlewareHandler !== true) {
      nuxt.options.nitro.plugins = nuxt.options.nitro.plugins || [];
      nuxt.options.nitro.plugins.push(
        resolver.resolve("./runtime/server/plugin/route.server.ts")
      );
    }

    const divider = `|-------------------------------------------------|`;
    const dividerLength = divider.length;
    let infoWinston = `
    ${divider}
    |               Logger Configuration              |
    ${divider}\n`;
    for (const key in options) {
      // @ts-ignore
      const value = `${key} : ${String(options[key])}`;
      const valueLength = value.length;
      const pad = diff(dividerLength - 4, valueLength) + valueLength;
      infoWinston += `    | ${value.padEnd(pad)} |\n`;
    }
    infoWinston += `    ${divider}`;
    logger.log(infoWinston);
  },
});

const diff = (a: number, b: number) => {
  return Math.abs(a - b);
};
