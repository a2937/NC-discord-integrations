import { errorHandler } from "../../utils/errorHandler";

export const parseUptimeSeconds = (secondsString: string): string => {
  try {
    const seconds = parseInt(secondsString);
    const days = seconds >= 86400 ? Math.floor(seconds / 86400) : 0;
    const hours =
      seconds >= 3600 ? Math.floor((seconds - days * 86400) / 3600) : 0;
    const minutes =
      seconds >= 60
        ? Math.floor((seconds - days * 86400 - hours * 3600) / 60)
        : 0;
    const secondsRemain = seconds - days * 86400 - hours * 3600 - minutes * 60;

    return `${days}d ${hours}h ${minutes}m ${secondsRemain}s`;
  } catch (err) {
    errorHandler("uptime seconds parser", err);
    return "unknown";
  }
};
