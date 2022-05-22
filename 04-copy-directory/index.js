
const fs = require('fs');
const path = require('path');
const masterWay = path.join(__dirname, 'files');
const copyWay = path.join(__dirname, 'files-copy');

fs.mkdir(copyWay, err => {
  if (err) throw err;
  console.log('Папка files-copy создана');
});

fs.readdir(copyWay, function(err, items) {
  if (err) throw err;
  items.forEach(item => {
    fs.unlink(path.join(copyWay, item), err => {
      if (err) throw err;
    });
  });
});

fs.readdir(masterWay, function(err, items) {
  items.forEach(item => {
    fs.copyFile(path.join(masterWay, item), path.join(copyWay, item), err => {
      if (err) throw err;
    });
  });
  console.log('Содержимое папки files скопировано в папку files-copy');
});





/*


*/