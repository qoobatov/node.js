
const {sayHi, userName} = require('./test') // запросили {деструктурированно} данные из файла тест.жс потому что эта функция была экспортирована iz test.js

console.log(sayHi('Erkin'));   // т.е тело функции с операциями выполняется из экспортированного файла, а здесь сама функция вызывается с аргументами 
console.log(sayHi('Aida'));
console.log(sayHi(userName));