import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const sourceDirectory = resolve(".openai");
const targetDirectory = resolve("dist", ".openai");

await mkdir(targetDirectory, { recursive: true });
await copyFile(
  resolve(sourceDirectory, "hosting.json"),
  resolve(targetDirectory, "hosting.json"),
);
