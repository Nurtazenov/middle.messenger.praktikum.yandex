import Handlebars from "handlebars";

Handlebars.registerHelper("isCurrentUserMessage", function (isCurrentUser: any) {
  return isCurrentUser ? "message_mine" : "message_other";
});

