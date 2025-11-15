import fs from "node:fs/promises";
import path from "node:path";

interface TryReadOrCreateFileParams {
  filePath: string;
  defaultContent?: string;
  encoding?: BufferEncoding;
}

export const tryReadOrCreateFile = async ({
  filePath,
  defaultContent = JSON.stringify([]),
  encoding = "utf-8",
}: TryReadOrCreateFileParams) => {
  try {
    const fileContent = await fs.readFile(filePath, { encoding });
    if (fileContent.length === 0) {
      return defaultContent;
    }
    return fileContent;
  } catch (error) {
    const fileError = error as { code?: string };
    if (fileError.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, defaultContent, {
        encoding,
      });
      return defaultContent;
    } else {
      throw error;
    }
  }
};
