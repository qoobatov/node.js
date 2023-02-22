// node.js есть 4 основных стрима

// Readable — чтение
// Writable — запись
// Duplex — чтение и запись
// Transform — вид Duplex потока, который может изменять данные

const fs = require("fs");
const zlib = require('zlib')

const readStream = fs.createReadStream("./docs/lorem.txt"); // поток чтения достаем из модуля fs
const writeStream = fs.createWriteStream("./docs/new-lorem.txt"); // поток записи
const compressStream = zlib.createGzip() // трансформация потока(это к примеру сжатие данных)

// readStream.on("data", (chunk) => {
//   // запускаем через "on". chunk - это данные в буфере(кусочек вообщем)
//   writeStream.write("\n-----------start chunk------------\n");
//   writeStream.write(chunk); // прочитанный чанк мы сейчас просто копируем(записываем) в новый файл указанный в папке docs
//   writeStream.write("\n-----------end chunk------------\n");
// });   вот это все выше вообщем называется Duplex (чтение и запись), но этот же способ намного легче можно написать через pipe

// pipe это связующий метод, чтение запись, или чтение трансформ или все три подряд
const handleError = () => {
  console.log("Error");
  readStream.destroy(); // удаление стрима
  writeStream.end("Запись файла завершилось ошибкой"); // завершение записи с текстом завершения в файле
};
readStream.on("error", handleError).pipe(compressStream).pipe(writeStream).on("error", handleError); // отлавливание ошибок в во время стрима чтения потом во время стрима записи 
