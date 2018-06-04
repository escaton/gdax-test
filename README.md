This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Start
`$ npm i && npm start`

## Misc
- all dependencies are "devDependencies", none of this is needed in runtime
- i started with infrastructure and business logic, so UI might be not so fancy
- npm package `gdax` is used for access the gdax API. It works but with noisy warnings inside `ws` dependency
- also gdax API is opened only for http and websocket requests are rejected
- i tried to do it without `redux`, but create something similar in `Form` component
- some styles are copy-pasted from [gdax.com](https://www.gdax.com)

## TODO
- save selected values (product, buy/sell) to localStorage and restore them on load
- fix `WithGdax` hoc unnecessary updates
- add flow types for `src/Form/actions.js`
- fix `ws` module because it breaks production build
  - eject and mock it in webpack
  - or remove `gdax` and get data just with `fetch`
- fix strange FF XHR problem
  - +1 to drop `gdax` and use `fetch` 