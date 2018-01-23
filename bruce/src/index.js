import { h, render } from 'react';
import './style/style.css';

let root;
function init() {
    let App = require("./components/app").default;
    root = render(<App />, document.body, root);
}

if (module.hot) {
    require('preact/devtools');
    module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();