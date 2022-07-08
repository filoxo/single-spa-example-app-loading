// https://stackoverflow.com/a/33292942/2554793
// MIT license
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
Why throttle?

In a real world scenario, your CDN may not be instantaneous or your client's
connections may be slow. The first load of each app may be delayed while the
module is downloaded by the browser. To better emmulate the real-world aspect
of this example I've added this throttle function that will delay loading of
the app on the first load only. THE ONLY PURPOSE OF THIS IS TO BE ABLE TO SEE
THE LOADER. In a REAL app DO NOT THIS AS IT IS *NOT NECESSARY*.

After first load the module is kept in memory and should mount instantaneously.
Also, note that "browser loading the (application) module" and "application
(module) loading data" are different and separate events.
*/
const loadCache = new Set();

export async function throttle(appName) {
  if (loadCache.has(appName)) {
    return Promise.resolve();
  } else {
    loadCache.add(appName);
    return sleep(3500); // 3.5 seconds
  }
}
