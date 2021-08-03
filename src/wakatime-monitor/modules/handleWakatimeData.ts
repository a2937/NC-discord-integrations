import { noWakatimeApiData } from "../data/noWakatimeApiData";
import { noWakatimeYesterday } from "../data/noWakatimeYesterday";
import { processingEmbed } from "../data/processingEmbed";
import { errorHandler } from "../../utils/errorHandler";
import { postWakatimeEmbed } from "./postWakatimeEmbed";
import { getWakatimeData } from "./getWakatimeData";
import { parseWakatimeData } from "./parseWakatimeData";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";

export const handleWakatimeData = async (
  CONFIG: GlobalConfigInt
): Promise<void> => {
  try {
    await postWakatimeEmbed(CONFIG, processingEmbed);

    const rawData = await getWakatimeData(CONFIG);

    if (!rawData) {
      await postWakatimeEmbed(CONFIG, noWakatimeApiData);
      return;
    }

    const parsedData = await parseWakatimeData(rawData);

    if (!parsedData) {
      await postWakatimeEmbed(CONFIG, noWakatimeYesterday);
      return;
    }

    await postWakatimeEmbed(CONFIG, parsedData);
  } catch (err) {
    errorHandler("data handler", err);
  }
};
