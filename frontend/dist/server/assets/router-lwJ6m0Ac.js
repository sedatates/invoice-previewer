import { jsxs, jsx } from "react/jsx-runtime";
import { createRootRoute, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, createRouter as createRouter$1 } from "@tanstack/react-router";
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
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-slate-900 min-h-screen text-white", children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import("./index-DjC-cpdc.js");
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
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx("div", { children: "404 - Page Not Found" })
  });
  return router;
}
const getRouter = createRouter;
export {
  createRouter,
  getRouter
};
