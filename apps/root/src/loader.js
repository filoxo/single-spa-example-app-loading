/*
Simple loader
I chose to go with the most simple approach: reusing a loader that is already present on the page.
This approach avoids having to create an HTML template, copy it, and insert/remove it from where 
the app is intended to be mounted. All of that is doable but this is simple.

The loader element itself is just HTML, a little bit of CSS for positioning, and the rest comes from
Pico.css https://picocss.com/docs/loading.html

You could take this same idea and use an image/SVG, pure css loader (such as https://github.com/loadingio/css-spinner).
To implement your own, first ask yourself:
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
