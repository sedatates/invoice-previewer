import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { c as createRouter$1, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, O as Outlet, S as Scripts } from "../_chunks/_libs/@tanstack/react-router.mjs";
import "../_libs/tiny-warning.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
import "stream";
import "util";
import "../_libs/isbot.mjs";
const Route$1 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Invoice Generator - Create Professional Invoices" },
      {
        name: "description",
        content: "Create beautiful, professional invoices in seconds. Free online invoice generator with multiple templates."
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      }
    ],
    scripts: [
      {
        src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
      },
      {
        src: "https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.min.js"
      }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "bg-slate-900 min-h-screen text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import("./index-DjC-cpdc.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
function createRouter() {
  const router = createRouter$1({
    routeTree,
    scrollRestoration: true,
    notFoundMode: "root",
    defaultNotFoundComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "404 - Page Not Found" })
  });
  return router;
}
const getRouter = createRouter;
export {
  createRouter,
  getRouter
};
