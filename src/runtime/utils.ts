
export const getColorCode = (colorName: string) => {
  const colorMap = {
    reset: "\x1B[0m",
    bright: "\x1B[1m",
    fgRed: "\x1B[31m",
    fgGreen: "\x1B[32m",
    fgYellow: "\x1B[33m",
    fgCyan: "\x1B[36m",
  };
  // @ts-ignore
  return colorMap[colorName] || "";
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const consoleLogWithColor = (message: string, level: string, color: any) => {
  const timestamp = formatDate(new Date());
  const coloredStr = `${color}${timestamp} [${level}] : ${message}${getColorCode(
    "reset",
  )}`;
  return coloredStr;
};

export const formatString = (format: string, ...args: any[]): string => {
  let index = 0;
  return format.replace(/%[sqxXdtbpceEfgGoOqTxXUv%%]/g, (match) => {
    switch (match) {
      case '%s':
        return String(args[index++]);
      case '%q':
        return JSON.stringify(args[index++]);
      case '%x':
        return args[index++].toString(16);
      case '%X':
        return args[index++].toString(16).toUpperCase();
      case '%d':
        return String(args[index++]);
      case '%t':
        return String(args[index++]);
      case '%p':
        return String(args[index++]);
      case '%b':
        return args[index++].toExponential();
      case '%e':
        return args[index++].toExponential();
      case '%E':
        return args[index++].toExponential().toUpperCase();
      case '%f':
      case '%F':
        return args[index++].toString();
      case '%g':
        return args[index++].toPrecision();
      case '%G':
        return args[index++].toPrecision().toUpperCase();
      case '%c':
        return String.fromCharCode(args[index++]);
      case '%o':
        return args[index++].toString(8);
      case '%O':
        return `0o${args[index++].toString(8)}`;
      case '%U':
        return `U+${args[index++].toString(16).toUpperCase()}`;
      case '%%':
        return '%';
      case '%v':
        return args[index++];
      case '%#v':
        return JSON.stringify(args[index++]);
      case '%T':
        return typeof args[index++];
      default:
        return match;
    }
  });
}
