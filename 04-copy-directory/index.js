
const fs = require('fs');
const path = require('path');
const masterWay = path.join(__dirname, 'files');
const copyWay = path.join(__dirname, 'files-copy');

fs.mkdir(copyWay, () => {
  console.log('Папка files-copy создана');
});

fs.readdir(copyWay, function(err, items) {
  items.forEach(item => {
    fs.unlink(path.join(copyWay, item), () => {
    });
  });
});

fs.readdir(masterWay, function(err, items) {
  items.forEach(item => {
    fs.copyFile(path.join(masterWay, item), path.join(copyWay, item), () => {
    });
  });
  console.log('Содержимое папки files скопировано в папку files-copy');
});