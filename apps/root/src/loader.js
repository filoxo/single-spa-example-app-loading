/*
Simple loader
I chose to go with the most simple approach: reusing a loader that is already present on the page.
This approach avoids having to create an HTML template, copy it, and insert/remove it from where 
the app is intended to be mounted. All of that is doable but this is simple.

The loader element itself is just HTML, a little bit of CSS for positioning, and the rest comes from
Pico.css https://picocss.com/docs/loading.html

You could take this same idea and use an image/SVG, pure css loader (such as https://github.com/loadingio/css-spinner).
A few questions to ask before implementing your own loader:

1. does this need to be reusable (multiple copies) or reused (single instance)? 
2. does the loader need to be placed where the app will mount to?
3. can I defer loading non-critical parts of that application? See also https://single-spa.js.org/docs/faq/#code-splits
4. does this application need a loading screen *before* being mounted, or should it display a loading indicator *after* it is mounted?
*/
const loaderElement = document.getElementById("loader");

export const loader = {
  show: () => {
    loaderElement.setAttribute("aria-busy", "true");
  },
  hide: () => {
    loaderElement.setAttribute("aria-busy", "false");
  },
};
