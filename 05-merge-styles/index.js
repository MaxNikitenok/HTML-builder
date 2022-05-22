const fs = require('fs');
const path = require('path');
const stylesDir = path.join(__dirname, 'styles');
const projectDir = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(projectDir);

fs.rm(projectDir, () => {
  fs.writeFile(projectDir, '', () => {
    fs.readdir(stylesDir, function(err, items) {
      items.forEach(item => {
        if(item.split('.')[1] === 'css') {
          fs.readFile(path.join(stylesDir, item), (err, data) => {
            writeStream.write(`${data}\n`);
          });
        }
      });
    });
  });
});




