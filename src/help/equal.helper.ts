import Handlebars from "handlebars";

Handlebars.registerHelper('isEqual', function (a: object, b: object) {
  if (typeof b === 'object') {
    console.error('b передается как объект, ожидается значение:', b);
  }
  
  return a === b;
});


