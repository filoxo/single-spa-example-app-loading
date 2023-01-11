# Single-spa example: app loading

See the live demo at [single-spa-example-app-loading.netlify.app](https://single-spa-example-app-loading.netlify.app)!

## Purpose

The purpose of this example is to show how to add a simple loader to the page. Please review the code for comments that explain why I made certain decisions. 

## Approach

In the root-config, the [loader markup](https://github.com/filoxo/single-spa-example-app-loading/blob/main/apps/root/src/index.ejs#L94-L96) and [styles](https://github.com/filoxo/single-spa-example-app-loading/blob/main/apps/root/src/index.ejs#L70-L82) are defined. This makes the loader sharable across the entire site/page. root-config.js houses a [wrapper loading function](https://github.com/filoxo/single-spa-example-app-loading/blob/bcfda52ea0dd0bcaaff4200c86080a9b8d6c9665/apps/root/src/example-root-config.js#L5-L13) that will toggle the loader visibility, load the requested application module, and then hide the loader once that completes.

## Additional Notes

- While this approach is simple, it may be too naive for your needs. This example is intended to inspire your solution, not become it!
- You may want to show a loader **in the place where the app will load** in which case you'll need to know where the app will mount. Most single-spa users let single-spa [decide where to mount to](https://github.com/single-spa/dom-element-getter-helpers/blob/main/src/dom-element-getter-helpers.ts#L54-L75) so this isn't very obvious. Providing a `domElement` or `domElementGetter` ([single-spa source code](https://github.com/single-spa/dom-element-getter-helpers/blob/f5e90eb1fb273fc89b3b838a1d163bbb435a8148/src/dom-element-getter-helpers.ts#L21-L29)) as a `registerApplication` custom prop would give you the control needed to implement that.
- Loading UI's are also doable and more simple with single-spa-layout! There are tradeoffs. See also: https://single-spa.js.org/docs/layout-definition/#loading-uis
- This example is implemented as a monorepo for illustration purposes. It's just easier to build examples this way but most orgs use single-spa/microfrontends to avoid a monolith application.
- Have a question? [Post a discussion](https://github.com/filoxo/single-spa-example-app-loading/discussions) though this is open source software and no support is implied.
- Found a bug, performance problem, out-of-date dependency? PRs welcome!

# Development

- clone repo locally
- use node v16+
  - if using nvm: run `nvm use`
  - if not using nvm: look at the nvmrc file and install/use compatible node version
- install dependencies `npm install`
- run all `npm run start`
- go to [localhost:9000](http://localhost:9000/) to view the page
