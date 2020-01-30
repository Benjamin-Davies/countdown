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
        'Hide Message ',
        c('input', {
          type: 'checkbox',
          defaultValue: localStorage.hideMessage,
          onChange(ev) {
            localStorage.hideMessage = ev.target.checked;
          },
        }),
      ),
    ),
    c('p', null,
      c('label', null,
        'Background ',
        c('input', {
          defaultValue: localStorage.background,
          onChange(ev) {
            localStorage.background = ev.target.value;
          },
        }),
      ),
    ),
    c('p', null,
      c('input', {
        type: 'file',
        accept: 'image/*',
        async onChange(ev) {
          const files = ev.target.files;
          if (files.length > 0) {
            const file = files[0];
            const base64 = await toBase64(file);
            localStorage.background = `url('${base64}')`;
          }
        }
      }),
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
