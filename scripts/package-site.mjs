import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDirectory = resolve("dist");
const serverDirectory = resolve(distDirectory, "server");
const hostingDirectory = resolve(distDirectory, ".openai");

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== "GET") return response;

    const acceptsHtml = (request.headers.get("accept") || "").includes("text/html");
    if (!acceptsHtml) return response;

    const indexUrl = new URL("/", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
`;

await Promise.all([
  mkdir(serverDirectory, { recursive: true }),
  mkdir(hostingDirectory, { recursive: true }),
]);
await Promise.all([
  writeFile(resolve(serverDirectory, "index.js"), worker, "utf8"),
  copyFile(
    resolve(".openai", "hosting.json"),
    resolve(hostingDirectory, "hosting.json"),
  ),
]);
