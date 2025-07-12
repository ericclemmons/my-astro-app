#!/usr/bin/env node --experimental-transform-types --watch

process.argv.push("--dev");

import alchemy from "alchemy";
import { Astro, R2Bucket, Worker } from "alchemy/cloudflare";

const app = await alchemy("my-astro-app");

const BUCKET = await R2Bucket("my-astro-app-bucket", {
  dev: {
    remote: true,
  },
});

const worker = await Astro("my-astro-app", {
  bindings: {
    BUCKET,
  },
  command: "pnpm run build",
  dev: {
    command: "pnpm run dev",
    url: "http://localhost:4321",
  },
});

console.log(`Worker deployed at: ${worker.url}`);
await app.finalize();
