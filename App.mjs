import Menu from './Menu.mjs';
import { getTime } from './time.mjs';

const { createElement: c, useEffect, useState } = React;

function App() {
  const [time, setTime] = useState('00:00');
  useEffect(() => {
    setTime(getTime());
    const interval = setInterval(() => {
      setTime(getTime());
    }, 500);
    return () => clearInterval(interval);
  });

  const background = localStorage.background;
  const showMessage = localStorage.showMessage === 'true';

  return c('div', {
    className: 'App',
    style: { background },
  },
    c(Spacer),

    showMessage && c('h2', null, 'Nau Mai, Haere Mai'),
    showMessage && c('h2', null, 'Welcome'),

    c(Spacer),

    c('h1', { className: 'time' }, time),

    c(Menu),
  );
}

function Spacer() {
  return c('div', { className: 'spacer' });
}

export default App;
