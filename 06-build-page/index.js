const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
let flag = 0;

function addBase() {
  fs.mkdir(path.join(__dirname, 'project-dist'), () => {
    fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), () => {
    });
  });
  fs.readdir(path.join(__dirname, 'components'), (err, items) => {
    let components = [];
    items.forEach(item => {
      if(path.extname(item) === '.html') {
        components.push(item);
      }
    });
    render(components[flag]);
    function render(component) {
      flag += 1;
      fs.readFile(path.join(__dirname, 'components', component), (_err, file) => {
        fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf8', function (_err,data) {
          let result = data.replace(`{{${component.split('.')[0]}}}`, `${file.toString()}`);
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, 'utf8', () => {
            if(items.length > flag) {
              render(components[flag]);
            }
          });
        });
      });
    }
  });
}

function addStyle() {
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', () => {
    fs.readdir(path.join(__dirname, 'styles'), (err, items) => {
      items.forEach(item => {
        if(item.split('.')[1] === 'css') {
          fs.readFile(path.join(path.join(__dirname, 'styles'), item), (err, data) => {
            writeStream.write(`${data}\n`);
          });
        }
      });
    });
  });
}

function rm(){
  fs.stat(path.join(__dirname, 'project-dist', 'assets'), function(err) {
    if (!err) {
      fs.readdir(path.join(__dirname, 'project-dist', 'assets'), (err, dirrs) => {
        dirrs.forEach(dir => {
          fs.readdir(path.join(__dirname, 'project-dist', 'assets', dir), (err, files) => {
            files.forEach(file => {
              fs.rm(path.join(__dirname, 'project-dist', 'assets', dir, file), () =>{
              });
            });
            addAss();
          });
        });
      });
    } else if (err.code === 'ENOENT') {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => {
        addAss();
      });
    }
  });
}

function addAss() {
  fs.readdir(path.join(__dirname, 'assets'), function(err, items) {
    items.forEach(item => {
      fs.stat(path.join(__dirname, 'assets', item), function(err, stats) {
        if(stats.isDirectory()) {
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', item), () => {
          });
          fs.readdir(path.join(__dirname, 'assets', item), function(err, files) {
            files.forEach(file => {
              fs.copyFile(path.join(__dirname, 'assets', item, file), path.join(__dirname, 'project-dist', 'assets', item, file), () => {
              });
            });
          });
        }
      });
    });
  });
}
rm();
addBase();
addStyle();
