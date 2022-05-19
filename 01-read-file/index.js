const fs = require('fs');
const path = require('path');
fs.readFile((path.join(__dirname, 'text.txt')), (error, data) => {
  console.log(data.toString());
});