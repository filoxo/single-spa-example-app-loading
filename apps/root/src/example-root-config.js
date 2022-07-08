import { registerApplication, start } from "single-spa";
import { throttle } from "./throttle";
import { loader } from "./loader";

async function loadApp(appName) {
  loader.show();
  try {
    await throttle(appName); // slow down first load, see throttle fn for more info
    return System.import(appName);
  } finally {
    loader.hide();
  }
}

registerApplication({
  name: "@example/nav",
  app: () => System.import("@example/nav"),
  activeWhen: "/",
});

registerApplication({
  name: "@example/app1",
  app: () => loadApp("@example/app1"),
  activeWhen: "/1",
});

registerApplication({
  name: "@example/app2",
  app: () => loadApp("@example/app2"),
  activeWhen: "/2",
});

start();
