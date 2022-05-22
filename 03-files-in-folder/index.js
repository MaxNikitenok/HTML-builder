const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), function(err, items) {
  items.forEach(item => {
    fs.stat(path.join(__dirname, 'secret-folder', item), (err, stats) => {
      if(stats.isFile()) {
        let result = item.split('.');
        result.push(`${stats.size / 1000}kb`);
        console.log(`${result.join(' - ')}`);
      }
    });
  });
});