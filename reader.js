const fs = require("fs");

readFileCallback = (error, data) => {
  error ? console.log("невожможно прочитать файл") : console.log(data);

  fs.mkdir("./myFiles", () => {});

  fs.writeFile(
    "./myFiles/second.txt",
    `${data}, будем кататься на великах!`,
    () => {}
  );
};

// это асинхронная функция принимает колбэк(error, data) error ошибка при чтении файла а data - это содержимое читаемого файла
fs.readFile("./text.txt", "utf-8", readFileCallback);

fs.readFile("./myFiles/second.txt", "utf-8", (error, data) => {
  error ? error : console.log(data);
});

// можно сделать работу с файлами синхорнными если в конце методов добавлять "Sync" - типа readFileSync или mkdirSync, если будет другой независимый асинхронный скрипт в потоке, то сервер будет тормозить.

setTimeout(() => {
  fs.unlink("./myFiles/second.txt", () => {
    console.log("second.txt was deleted");
  });
}, 4000);
setTimeout(() => {
  fs.rmdir("./myFiles", () => {
    console.log("Directoria Files was deleted");
  });
}, 6000);
