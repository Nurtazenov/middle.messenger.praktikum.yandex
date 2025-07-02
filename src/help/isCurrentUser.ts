import Handlebars from "handlebars";

Handlebars.registerHelper("isCurrentUserMessage", function (isCurrentUser) {
  return isCurrentUser ? "message_mine" : "message_other";
});

