const CHUNK_PUBLIC_PATH = "server/pages/index.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__f76986._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_32fb61._.js");
runtime.loadChunk("server/chunks/ssr/f4bb4_lodash_d6a101._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_recharts_es6_5863d0._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_fd26c3._.js");
runtime.loadChunk("server/chunks/ssr/src_styles_globals_070f83.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/index.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/src/pages/_document.tsx [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
