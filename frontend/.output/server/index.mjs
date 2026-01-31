globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, t as toEventHandler, a as defineLazyEventHandler, b as H3Core, c as HTTPResponse } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled;
  const status = error.status || 500;
  const url = event.url || new URL(event.req.url);
  if (status === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.req.method}] ${url}
`, error);
  }
  const headers2 = {
    "content-type": "application/json",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "no-referrer",
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  if (status === 404 || !event.res.headers.has("cache-control")) {
    headers2["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    status,
    statusText: error.statusText,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status,
    statusText: error.statusText,
    headers: headers2,
    body
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/assets/index-B4nbawT8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6bbf-RT0XNX2/0/fNB/oyCXyFqHdV4fA"',
    "mtime": "2026-01-31T18:20:07.344Z",
    "size": 27583,
    "path": "../public/assets/index-B4nbawT8.js"
  },
  "/assets/main-CI7KXGrP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"40b4d-VALXIgSLQ4tRrPGVZnv3MREefBc"',
    "mtime": "2026-01-31T18:20:07.344Z",
    "size": 265037,
    "path": "../public/assets/main-CI7KXGrP.js"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br"
};
const _f8PxHF = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/");
    s.length - 1;
    if (s[1] === "assets") {
      r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
    }
    return r;
  };
})();
const _lazy_8AdI1g = defineLazyEventHandler(() => Promise.resolve().then(function() {
  return rendererTemplate;
}));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_8AdI1g };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_f8PxHF)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  for (const rule of Object.values(routeRules)) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const port = Number.parseInt(process.env.NITRO_PORT || process.env.PORT || "") || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch
});
trapUnhandledErrors();
const nodeServer = {};
const rendererTemplate$1 = () => new HTTPResponse('<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Invoice Generator</title>\n    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>\n    <script src="https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.min.js"><\/script>\n    <link\n      rel="stylesheet"\n      href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n    <style>\n      .template-thumb {\n        transform: scale(0.18);\n        transform-origin: top left;\n        width: 555%;\n        height: 555%;\n      }\n      .thumb-container {\n        width: 80px;\n        height: 113px;\n        overflow: hidden;\n        position: relative;\n      }\n      .template-name-overlay {\n        position: absolute;\n        inset: 0;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: #334155;\n        z-index: 10;\n        transition: opacity 0.3s ease;\n      }\n      .template-loader {\n        position: absolute;\n        inset: 0;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(51, 65, 85, 0.9);\n        z-index: 20;\n      }\n      input:focus,\n      textarea:focus,\n      select:focus {\n        outline: none;\n        border-color: #3b82f6;\n        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n      }\n      .preview-frame {\n        transform-origin: top left;\n      }\n\n      /* Sticky Preview Panel */\n      .preview-panel {\n        position: sticky;\n        top: 24px;\n        height: calc(100vh - 120px);\n        align-self: flex-start;\n      }\n\n      /* Smooth scrollbar for editor */\n      .editor-panel::-webkit-scrollbar {\n        width: 6px;\n      }\n      .editor-panel::-webkit-scrollbar-track {\n        background: transparent;\n      }\n      .editor-panel::-webkit-scrollbar-thumb {\n        background: #475569;\n        border-radius: 3px;\n      }\n      .editor-panel::-webkit-scrollbar-thumb:hover {\n        background: #64748b;\n      }\n\n      @media (max-width: 1024px) {\n        .main-grid {\n          grid-template-columns: 1fr !important;\n        }\n        .preview-panel {\n          position: relative;\n          top: 0;\n          height: auto;\n        }\n      }\n    </style>\n  </head>\n  <body class="bg-slate-900 min-h-screen text-white">\n    <!-- Header -->\n    <header class="bg-slate-800 border-b border-slate-700 px-6 py-4">\n      <div class="max-w-7xl mx-auto flex items-center justify-between">\n        <div class="flex items-center gap-3">\n          <div\n            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">\n            <svg\n              class="w-6 h-6 text-white"\n              fill="none"\n              stroke="currentColor"\n              viewBox="0 0 24 24">\n              <path\n                stroke-linecap="round"\n                stroke-linejoin="round"\n                stroke-width="2"\n                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />\n            </svg>\n          </div>\n          <div>\n            <h1 class="text-xl font-bold">Invoice Generator</h1>\n            <p class="text-slate-400 text-xs">Create professional invoices</p>\n          </div>\n        </div>\n        <div class="flex items-center gap-3">\n          <button\n            id="downloadPdfBtn"\n            class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all flex items-center gap-2 text-sm">\n            <svg\n              class="w-4 h-4"\n              fill="none"\n              stroke="currentColor"\n              viewBox="0 0 24 24">\n              <path\n                stroke-linecap="round"\n                stroke-linejoin="round"\n                stroke-width="2"\n                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />\n            </svg>\n            Download PDF\n          </button>\n        </div>\n      </div>\n    </header>\n\n    <!-- Main Content -->\n    <main class="max-w-7xl mx-auto p-6">\n      <div class="main-grid grid grid-cols-[400px_1fr] gap-6 items-start">\n        <!-- Left Panel - Editor -->\n        <div class="editor-panel space-y-4 pr-2">\n          <!-- Template Selector -->\n          <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">\n            <label class="block text-sm font-medium text-slate-300 mb-3"\n              >Template</label\n            >\n            <div id="templateGrid" class="grid grid-cols-4 gap-2">\n              <!-- Templates will be injected here -->\n            </div>\n            <div id="templateLoading" class="hidden">\n              <div class="grid grid-cols-4 gap-2">\n                <div\n                  class="animate-pulse bg-slate-700 rounded-lg h-[113px]"></div>\n                <div\n                  class="animate-pulse bg-slate-700 rounded-lg h-[113px]"></div>\n                <div\n                  class="animate-pulse bg-slate-700 rounded-lg h-[113px]"></div>\n                <div\n                  class="animate-pulse bg-slate-700 rounded-lg h-[113px]"></div>\n              </div>\n              <p class="text-xs text-slate-400 text-center mt-2">\n                Loading templates...\n              </p>\n            </div>\n          </div>\n\n          <!-- Company Info -->\n          <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">\n            <h3\n              class="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">\n              <svg\n                class="w-4 h-4 text-blue-400"\n                fill="none"\n                stroke="currentColor"\n                viewBox="0 0 24 24">\n                <path\n                  stroke-linecap="round"\n                  stroke-linejoin="round"\n                  stroke-width="2"\n                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />\n              </svg>\n              Your Company\n            </h3>\n            <div class="space-y-3">\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Company Name</label\n                >\n                <input\n                  type="text"\n                  id="companyName"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400"\n                  placeholder="Acme Corporation" />\n              </div>\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Logo URL (optional)</label\n                >\n                <input\n                  type="text"\n                  id="companyLogo"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400"\n                  placeholder="https://example.com/logo.png" />\n              </div>\n              <div>\n                <label class="block text-xs text-slate-400 mb-1">Address</label>\n                <textarea\n                  id="companyAddress"\n                  rows="2"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none"\n                  placeholder="123 Business Ave&#10;San Francisco, CA 94102"></textarea>\n              </div>\n            </div>\n          </div>\n\n          <!-- Client Info -->\n          <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">\n            <h3\n              class="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">\n              <svg\n                class="w-4 h-4 text-green-400"\n                fill="none"\n                stroke="currentColor"\n                viewBox="0 0 24 24">\n                <path\n                  stroke-linecap="round"\n                  stroke-linejoin="round"\n                  stroke-width="2"\n                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n              </svg>\n              Bill To\n            </h3>\n            <div class="space-y-3">\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Client Name</label\n                >\n                <input\n                  type="text"\n                  id="clientName"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400"\n                  placeholder="John Smith" />\n              </div>\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Client Address</label\n                >\n                <textarea\n                  id="clientAddress"\n                  rows="2"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none"\n                  placeholder="456 Client Street&#10;New York, NY 10001"></textarea>\n              </div>\n            </div>\n          </div>\n\n          <!-- Invoice Details -->\n          <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">\n            <h3\n              class="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">\n              <svg\n                class="w-4 h-4 text-purple-400"\n                fill="none"\n                stroke="currentColor"\n                viewBox="0 0 24 24">\n                <path\n                  stroke-linecap="round"\n                  stroke-linejoin="round"\n                  stroke-width="2"\n                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />\n              </svg>\n              Invoice Details\n            </h3>\n            <div class="grid grid-cols-2 gap-3">\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Invoice Number</label\n                >\n                <input\n                  type="text"\n                  id="invoiceNumber"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white"\n                  placeholder="INV-001" />\n              </div>\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Currency</label\n                >\n                <select\n                  id="currency"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white">\n                  <option value="$">$ USD</option>\n                  <option value="€">€ EUR</option>\n                  <option value="£">£ GBP</option>\n                  <option value="₺">₺ TRY</option>\n                </select>\n              </div>\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Issue Date</label\n                >\n                <input\n                  type="date"\n                  id="issuedOn"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white" />\n              </div>\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Due Date</label\n                >\n                <input\n                  type="date"\n                  id="dueOn"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white" />\n              </div>\n            </div>\n          </div>\n\n          <!-- Line Items -->\n          <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">\n            <div class="flex items-center justify-between mb-3">\n              <h3\n                class="text-sm font-medium text-slate-300 flex items-center gap-2">\n                <svg\n                  class="w-4 h-4 text-amber-400"\n                  fill="none"\n                  stroke="currentColor"\n                  viewBox="0 0 24 24">\n                  <path\n                    stroke-linecap="round"\n                    stroke-linejoin="round"\n                    stroke-width="2"\n                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />\n                </svg>\n                Line Items\n              </h3>\n              <button\n                id="addItemBtn"\n                class="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">\n                <svg\n                  class="w-3 h-3"\n                  fill="none"\n                  stroke="currentColor"\n                  viewBox="0 0 24 24">\n                  <path\n                    stroke-linecap="round"\n                    stroke-linejoin="round"\n                    stroke-width="2"\n                    d="M12 4v16m8-8H4" />\n                </svg>\n                Add Item\n              </button>\n            </div>\n            <div id="itemsContainer" class="space-y-2">\n              <!-- Items will be injected here -->\n            </div>\n          </div>\n\n          <!-- Tax & Notes -->\n          <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">\n            <h3\n              class="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">\n              <svg\n                class="w-4 h-4 text-rose-400"\n                fill="none"\n                stroke="currentColor"\n                viewBox="0 0 24 24">\n                <path\n                  stroke-linecap="round"\n                  stroke-linejoin="round"\n                  stroke-width="2"\n                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />\n              </svg>\n              Tax & Notes\n            </h3>\n            <div class="space-y-3">\n              <div>\n                <label class="block text-xs text-slate-400 mb-1"\n                  >Tax Rate (%)</label\n                >\n                <input\n                  type="number"\n                  id="taxRate"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white"\n                  placeholder="10"\n                  min="0"\n                  max="100" />\n              </div>\n              <div>\n                <label class="block text-xs text-slate-400 mb-1">Notes</label>\n                <textarea\n                  id="notes"\n                  rows="3"\n                  class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 resize-none"\n                  placeholder="Payment terms, bank details, etc."></textarea>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <!-- Right Panel - Preview (Sticky) -->\n        <div\n          class="preview-panel bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl">\n          <div\n            class="bg-slate-700/50 px-4 py-3 border-b border-slate-700 flex items-center justify-between shrink-0">\n            <span class="text-sm font-medium text-slate-300">Preview</span>\n            <div class="flex items-center gap-2">\n              <span id="totalDisplay" class="text-lg font-bold text-green-400"\n                >$0.00</span\n              >\n            </div>\n          </div>\n          <div\n            class="flex-1 overflow-auto p-4 bg-slate-600/30 flex justify-center">\n            <div\n              class="bg-white rounded-lg shadow-2xl overflow-hidden"\n              style="width: 595px; min-height: 842px">\n              <iframe\n                id="previewFrame"\n                class="w-full"\n                style="height: 842px; border: none"></iframe>\n            </div>\n          </div>\n        </div>\n      </div>\n    </main>\n\n    <!-- Loading Overlay -->\n    <div\n      id="loadingOverlay"\n      class="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50">\n      <div class="text-center">\n        <div\n          class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>\n        <p class="text-slate-400 mt-4">Loading templates...</p>\n      </div>\n    </div>\n\n    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"><\/script>\n    <script>\n      const CDN_BASE =\n        "https://cdn.jsdelivr.net/gh/sedatates/invoice-previewer@main";\n      const API_BASE = "https://invoice-backend-production-c91b.up.railway.app";\n\n      let templates = [];\n      let templateCache = {};\n      let selectedTemplate = "minimal";\n      let items = [\n        { description: "Web Development", quantity: 10, rate: 150 },\n        { description: "UI/UX Design", quantity: 5, rate: 120 },\n      ];\n\n      // Initialize default values\n      function initDefaults() {\n        document.getElementById("companyName").value = "Acme Corporation";\n        document.getElementById("companyLogo").value = "";\n        document.getElementById("companyAddress").value =\n          "123 Business Ave\\nSan Francisco, CA 94102\\nhello@acme.com";\n        document.getElementById("clientName").value = "John Smith";\n        document.getElementById("clientAddress").value =\n          "456 Client Street\\nNew York, NY 10001";\n        document.getElementById("invoiceNumber").value =\n          "INV-" + String(Math.floor(Math.random() * 9000) + 1000);\n        document.getElementById("currency").value = "$";\n\n        const today = new Date();\n        const dueDate = new Date(today);\n        dueDate.setDate(dueDate.getDate() + 30);\n\n        document.getElementById("issuedOn").value = today\n          .toISOString()\n          .split("T")[0];\n        document.getElementById("dueOn").value = dueDate\n          .toISOString()\n          .split("T")[0];\n        document.getElementById("taxRate").value = "10";\n        document.getElementById("notes").value =\n          "Thank you for your business!\\nPayment via bank transfer.";\n\n        renderItems();\n      }\n\n      // Render line items\n      function renderItems() {\n        const container = document.getElementById("itemsContainer");\n        container.innerHTML = items\n          .map(\n            (item, index) => `\n        <div class="bg-slate-700/50 rounded-lg p-3 space-y-2" data-index="${index}">\n          <div class="flex items-center justify-between">\n            <input type="text" value="${item.description}" placeholder="Description"\n              class="flex-1 bg-slate-600 border border-slate-500 rounded px-2 py-1.5 text-sm text-white item-description">\n            <button class="ml-2 text-slate-400 hover:text-red-400 transition-colors delete-item" data-index="${index}">\n              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>\n              </svg>\n            </button>\n          </div>\n          <div class="grid grid-cols-2 gap-2">\n            <div>\n              <label class="text-[10px] text-slate-400">Quantity</label>\n              <input type="number" value="${item.quantity}" min="1"\n                class="w-full bg-slate-600 border border-slate-500 rounded px-2 py-1 text-sm text-white item-quantity">\n            </div>\n            <div>\n              <label class="text-[10px] text-slate-400">Rate</label>\n              <input type="number" value="${item.rate}" min="0" step="0.01"\n                class="w-full bg-slate-600 border border-slate-500 rounded px-2 py-1 text-sm text-white item-rate">\n            </div>\n          </div>\n        </div>\n      `\n          )\n          .join("");\n\n        // Add event listeners\n        container.querySelectorAll(".delete-item").forEach((btn) => {\n          btn.addEventListener("click", (e) => {\n            const index = parseInt(e.currentTarget.dataset.index);\n            items.splice(index, 1);\n            renderItems();\n            updatePreview();\n          });\n        });\n\n        container.querySelectorAll("input").forEach((input) => {\n          input.addEventListener("input", (e) => {\n            const itemEl = e.target.closest("[data-index]");\n            const index = parseInt(itemEl.dataset.index);\n            if (e.target.classList.contains("item-description")) {\n              items[index].description = e.target.value;\n            } else if (e.target.classList.contains("item-quantity")) {\n              items[index].quantity = parseFloat(e.target.value) || 0;\n            } else if (e.target.classList.contains("item-rate")) {\n              items[index].rate = parseFloat(e.target.value) || 0;\n            }\n            updatePreview();\n          });\n        });\n      }\n\n      // Get form data\n      function getFormData() {\n        const currency = document.getElementById("currency").value;\n        return {\n          invoiceNumber: document.getElementById("invoiceNumber").value,\n          companyName: document.getElementById("companyName").value,\n          companyLogo: document.getElementById("companyLogo").value,\n          companyAddress: document\n            .getElementById("companyAddress")\n            .value.split("\\n"),\n          clientName: document.getElementById("clientName").value,\n          clientAddress: document\n            .getElementById("clientAddress")\n            .value.split("\\n"),\n          issuedOn: document.getElementById("issuedOn").value,\n          dueOn: document.getElementById("dueOn").value,\n          items: items,\n          taxRate: parseFloat(document.getElementById("taxRate").value) || 0,\n          currency: currency,\n          notes: document.getElementById("notes").value,\n        };\n      }\n\n      // Prepare template data\n      function prepareTemplateData(data) {\n        const currency = data.currency || "$";\n\n        let subtotal = 0;\n        const itemsRows = data.items\n          .map((item) => {\n            const amount = item.quantity * item.rate;\n            subtotal += amount;\n            return `<tr class="border-b border-gray-200">\n          <td class="py-2 px-2">${item.description}</td>\n          <td class="py-2 px-2 text-right">${item.quantity}</td>\n          <td class="py-2 px-2 text-right">${currency}${item.rate.toFixed(\n              2\n            )}</td>\n          <td class="py-2 px-2 text-right">${currency}${amount.toFixed(2)}</td>\n        </tr>`;\n          })\n          .join("");\n\n        const taxRate = data.taxRate || 0;\n        const taxAmount = subtotal * (taxRate / 100);\n        const total = subtotal + taxAmount;\n\n        // Update total display\n        document.getElementById(\n          "totalDisplay"\n        ).textContent = `${currency}${total.toFixed(2)}`;\n\n        const companyLines = Array.isArray(data.companyAddress)\n          ? data.companyAddress.join("<br>")\n          : data.companyAddress;\n\n        const clientLines = `<strong>${data.clientName}</strong><br>${\n          Array.isArray(data.clientAddress)\n            ? data.clientAddress.join("<br>")\n            : data.clientAddress\n        }`;\n\n        const notesBlock = data.notes\n          ? `<div class="mt-6 p-4 bg-gray-50 rounded text-[9px] text-gray-600">\n            <p class="font-bold text-gray-500 uppercase text-[8px] mb-1">Notes</p>\n            <p class="whitespace-pre-line">${data.notes}</p>\n          </div>`\n          : "";\n\n        return {\n          ...data,\n          hasLogo: !!data.companyLogo,\n          companyLines,\n          clientLines,\n          itemsRows,\n          subtotalFormatted: `${currency}${subtotal.toFixed(2)}`,\n          taxRateLabel: taxRate,\n          taxAmountFormatted: `${currency}${taxAmount.toFixed(2)}`,\n          totalFormatted: `${currency}${total.toFixed(2)}`,\n          notesBlock,\n        };\n      }\n\n      // Fetch template\n      async function fetchTemplate(templateId) {\n        if (templateCache[templateId]) {\n          return templateCache[templateId];\n        }\n        const response = await fetch(\n          `${CDN_BASE}/templates/${templateId}.html`\n        );\n        const html = await response.text();\n        templateCache[templateId] = html;\n        return html;\n      }\n\n      // Update preview\n      async function updatePreview() {\n        try {\n          const data = getFormData();\n          const templateHtml = await fetchTemplate(selectedTemplate);\n          const preparedData = prepareTemplateData(data);\n          const renderedHtml = Mustache.render(templateHtml, preparedData);\n\n          const iframe = document.getElementById("previewFrame");\n          const doc = iframe.contentDocument || iframe.contentWindow.document;\n          doc.open();\n          doc.write(renderedHtml);\n          doc.close();\n        } catch (error) {\n          console.error("Preview error:", error);\n        }\n      }\n\n      // Render template grid with names first, then lazy load thumbnails\n      function renderTemplateGrid() {\n        const grid = document.getElementById("templateGrid");\n        grid.innerHTML = templates\n          .map(\n            (template) => `\n        <button class="template-btn rounded-lg overflow-hidden border-2 transition-all ${\n          template.id === selectedTemplate\n            ? "border-blue-500 ring-2 ring-blue-500/30"\n            : "border-slate-600 hover:border-slate-500"\n        }"\n          data-template="${template.id}" title="${template.label}">\n          <div class="thumb-container bg-slate-700 flex items-center justify-center relative">\n            <div class="template-name-overlay absolute inset-0 flex items-center justify-center bg-slate-700 z-10">\n              <span class="text-[10px] text-slate-300 text-center px-1 font-medium">${\n                template.label\n              }</span>\n            </div>\n            <div class="template-loader absolute inset-0 flex items-center justify-center bg-slate-700/90 z-20 hidden">\n              <div class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>\n            </div>\n            <iframe data-src="${CDN_BASE}/templates/${\n              template.id\n            }.html" class="template-thumb pointer-events-none opacity-0 transition-opacity duration-300" sandbox="allow-scripts"></iframe>\n          </div>\n        </button>\n      `\n          )\n          .join("");\n\n        grid.querySelectorAll(".template-btn").forEach((btn) => {\n          btn.addEventListener("click", () => {\n            selectedTemplate = btn.dataset.template;\n            grid.querySelectorAll(".template-btn").forEach((b) => {\n              b.classList.remove(\n                "border-blue-500",\n                "ring-2",\n                "ring-blue-500/30"\n              );\n              b.classList.add("border-slate-600");\n            });\n            btn.classList.remove("border-slate-600");\n            btn.classList.add("border-blue-500", "ring-2", "ring-blue-500/30");\n            updatePreview();\n          });\n        });\n\n        // Lazy load template thumbnails\n        loadTemplateThumbnails();\n      }\n\n      // Load template thumbnails progressively\n      function loadTemplateThumbnails() {\n        const iframes = document.querySelectorAll(\n          "#templateGrid iframe[data-src]"\n        );\n\n        iframes.forEach((iframe, index) => {\n          const container = iframe.closest(".thumb-container");\n          const loader = container.querySelector(".template-loader");\n          const nameOverlay = container.querySelector(".template-name-overlay");\n\n          // Show loader\n          loader.classList.remove("hidden");\n\n          // Stagger the loading slightly for better UX\n          setTimeout(() => {\n            iframe.src = iframe.dataset.src;\n\n            iframe.onload = () => {\n              // Hide loader and name overlay, show thumbnail\n              loader.classList.add("hidden");\n              nameOverlay.classList.add("opacity-0");\n              iframe.classList.remove("opacity-0");\n\n              // Remove name overlay after fade\n              setTimeout(() => {\n                nameOverlay.classList.add("hidden");\n              }, 300);\n            };\n\n            iframe.onerror = () => {\n              loader.classList.add("hidden");\n              // Keep name visible on error\n            };\n          }, index * 150);\n        });\n      }\n\n      // Download PDF\n      async function downloadPdf() {\n        const btn = document.getElementById("downloadPdfBtn");\n        const originalHtml = btn.innerHTML;\n        btn.innerHTML =\n          \'<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generating...\';\n        btn.disabled = true;\n\n        try {\n          const data = getFormData();\n          const response = await fetch(`${API_BASE}/render`, {\n            method: "POST",\n            headers: { "Content-Type": "application/json" },\n            body: JSON.stringify({\n              template: selectedTemplate,\n              data: data,\n              options: {\n                format: "A4",\n                marginTop: "10mm",\n                marginBottom: "10mm",\n              },\n            }),\n          });\n\n          if (!response.ok) throw new Error("PDF generation failed");\n\n          const blob = await response.blob();\n          const url = URL.createObjectURL(blob);\n          const a = document.createElement("a");\n          a.href = url;\n          a.download = `${data.invoiceNumber || "invoice"}.pdf`;\n          a.click();\n          URL.revokeObjectURL(url);\n        } catch (error) {\n          console.error("Download error:", error);\n          alert("Failed to generate PDF. Please try again.");\n        } finally {\n          btn.innerHTML = originalHtml;\n          btn.disabled = false;\n        }\n      }\n\n      // Initialize\n      async function init() {\n        try {\n          const response = await fetch(`${CDN_BASE}/index.json`);\n          const data = await response.json();\n          templates = data.templates;\n\n          initDefaults();\n          renderTemplateGrid();\n\n          // Add event listeners for form inputs\n          const inputs = document.querySelectorAll(\n            "#companyName, #companyLogo, #companyAddress, #clientName, #clientAddress, #invoiceNumber, #currency, #issuedOn, #dueOn, #taxRate, #notes"\n          );\n          inputs.forEach((input) => {\n            input.addEventListener("input", updatePreview);\n            input.addEventListener("change", updatePreview);\n          });\n\n          // Add item button\n          document\n            .getElementById("addItemBtn")\n            .addEventListener("click", () => {\n              items.push({ description: "", quantity: 1, rate: 0 });\n              renderItems();\n              updatePreview();\n            });\n\n          // Download PDF button\n          document\n            .getElementById("downloadPdfBtn")\n            .addEventListener("click", downloadPdf);\n\n          // Initial preview\n          await updatePreview();\n\n          document.getElementById("loadingOverlay").classList.add("hidden");\n        } catch (error) {\n          console.error("Init error:", error);\n          document.getElementById("loadingOverlay").innerHTML = `\n          <div class="text-center text-red-400">\n            <p class="text-lg font-semibold">Failed to load</p>\n            <p class="text-sm mt-2">${error.message}</p>\n            <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-slate-700 rounded-lg">Retry</button>\n          </div>\n        `;\n        }\n      }\n\n      init();\n    <\/script>\n  </body>\n</html>\n', { headers: { "content-type": "text/html; charset=utf-8" } });
function renderIndexHTML(event) {
  return rendererTemplate$1(event.req);
}
const rendererTemplate = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: renderIndexHTML
});
export {
  nodeServer as default
};
