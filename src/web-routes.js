import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { poilistController } from "./controllers/poilist-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  
  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addpoilist", config: dashboardController.addPoilist },

  { method: "GET", path: "/poilist/{id}", config: poilistController.index },
  { method: "POST", path: "/poilist/{id}/addFeature", config: poilistController.addFeature },

  { method: "GET", path: "/dashboard/deletepoilist/{id}", config: dashboardController.deletePoilist },
  { method: "GET", path: "/poilist/{id}/deletefeature/{featureid}", config: poilistController.deleteFeature },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];
