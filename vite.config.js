import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { viteStaticCopy } from "vite-plugin-static-copy";

import path from "path";

export default defineConfig({
  plugins: [
    crx({ manifest }),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: "audio/**/*",
    //       dest: "audio",
    //     },
    //   ],
    // })
  ]
});