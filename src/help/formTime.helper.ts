import Handlebars from "handlebars";

Handlebars.registerHelper("formatTime", function (time: string) {
  const date = new Date(time);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
});


