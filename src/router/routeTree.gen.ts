import { route as rootRoute } from "./routes/__root"
import { route as LoggedOutRoute } from "./routes/_loggedOut"
import { route as LoggedInRoute } from "./routes/_loggedIn"
import { route as IndexRoute } from "./routes"
import { route as LoggedOutLoginRoute } from "./routes/_loggedOut/login"
import { route as LoggedInProductsProductIdRoute } from "./routes/_loggedIn/products.$productId"
import { route as LoggedInProductsIndexRoute } from "./routes/_loggedIn/products.index"

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      parentRoute: typeof rootRoute
    }
    "/_loggedIn": {
      parentRoute: typeof rootRoute
    }
    "/_loggedOut": {
      parentRoute: typeof rootRoute
    }
    "/_loggedOut/login": {
      parentRoute: typeof LoggedOutRoute
    }
    "/_loggedIn/products/": {
      parentRoute: typeof LoggedInRoute
    }
    "/_loggedIn/products/$productId": {
      parentRoute: typeof LoggedInRoute
    }
  }
}

Object.assign(IndexRoute.options, {
  path: "/",
  getParentRoute: () => rootRoute,
})

Object.assign(LoggedInRoute.options, {
  id: "/loggedIn",
  getParentRoute: () => rootRoute,
})

Object.assign(LoggedOutRoute.options, {
  id: "/loggedOut",
  getParentRoute: () => rootRoute,
})

Object.assign(LoggedOutLoginRoute.options, {
  path: "/login",
  getParentRoute: () => LoggedOutRoute,
})

Object.assign(LoggedInProductsIndexRoute.options, {
  path: "/products/",
  getParentRoute: () => LoggedInRoute,
})

Object.assign(LoggedInProductsProductIdRoute.options, {
  path: "/products/$productId",
  getParentRoute: () => LoggedInRoute,
})

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  LoggedInRoute.addChildren([
    LoggedInProductsIndexRoute,
    LoggedInProductsProductIdRoute,
  ]),
  LoggedOutRoute.addChildren([LoggedOutLoginRoute]),
])
