const c = require('ansi-colors');

const colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
];

const variants = [
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'strikethrough',
];

colors.forEach(color => {
  const str = [c[color](color)];
  variants.forEach(variant => {
    str.push(c[color][variant](`${color}.${variant}`));
  });
  console.log(str.join(' '));
});
