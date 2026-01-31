import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Invoice Generator - Create Professional Invoices" },
      {
        name: "description",
        content:
          "Create beautiful, professional invoices in seconds. Free online invoice generator with multiple templates.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
      },
    ],
    scripts: [
      {
        src: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
      },
      {
        src: "https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.min.js",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-900 min-h-screen text-white">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
