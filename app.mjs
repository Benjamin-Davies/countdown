import App from './App.mjs';

const { createElement: c } = React;

function renderPage() {
  ReactDOM.render(c(App), document.getElementById('root'));
}

window.refresh = renderPage;
renderPage();
