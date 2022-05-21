const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;
const readline = require('readline');
const rl = readline.createInterface(stdin, stdout);
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {if(err) throw err;});
stdout.write('Здравствуйте, пожалуйста введите текст...\n');

rl.on('line', input => {
  if(input === 'exit') {
    stdout.write('До свидания');
    process.exit();
  }
  writeStream.write(`${input}\n`);

  stdout.write('Текст добавлен в файл text.txt, Пожалуйста введите что-то ещё...\n');
});

rl.on('close', () => {
  stdout.write('До свидания:)\n');
  process.exit();
});