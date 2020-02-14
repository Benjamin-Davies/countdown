const { createElement: c, useCallback, useState } = React;

function Menu() {
  const [showPreferences, setShowPreferences] = useState(false);
  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  return c('nav', { className: 'Menu' },
    c(Preferences, {
      showPreferences,
      done() {
        setShowPreferences(false);
      },
    }),
    c('div', { className: 'bar' },
      c('button', { onClick: togglePreferences }, 'Preferences'),
    ),
  );
}

function Preferences({ showPreferences, done }) {
  return c('aside', {
    className: showPreferences
      ? 'Preferences'
      : 'Preferences hidden'
  },
    c('h1', null, 'Preferences'),
    c('p', null,
      c('label', null,
        'Show Welcome ',
        c('input', {
          type: 'checkbox',
          defaultValue: localStorage.showWelcome,
          onChange(ev) {
            localStorage.showWelcome = ev.target.checked;
            refresh();
          },
        }),
      ),
    ),
    c('p', null,
      c('label', null,
        'Show Message ',
        c('input', {
          type: 'checkbox',
          defaultValue: localStorage.showMessage,
          onChange(ev) {
            localStorage.showMessage = ev.target.checked;
            refresh();
          },
        }),
      ),
    ),
    c('p', null,
      c('label', null,
        'Late by ',
        c('input', {
          type: 'number',
          defaultValue: 0,
          onChange(ev) {
            window.late = ev.target.value;
            console.log(late)
            refresh();
          },
        }),
        'minutes',
      ),
    ),
    c('p', null,
      c('label', null,
        'Background ',
        c('input', {
          defaultValue: localStorage.background,
          onChange(ev) {
            localStorage.background = ev.target.value;
            refresh();
          },
        }),
      ),
    ),
    c('p', null,
      c('label', null,
        'Background Image ',
        c('input', {
          type: 'file',
          accept: 'image/*',
          async onChange(ev) {
            const files = ev.target.files;
            if (files.length > 0) {
              const file = files[0];
              const base64 = await toBase64(file);

              localStorage.background = `url('${base64}')`;
              refresh();
            }
          }
        }),
      ),
    ),
    c('p', null,
      c('button', {
        onClick: done,
      }, 'Done'),
    ),
  );
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default Menu;
