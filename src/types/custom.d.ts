declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars";

  const template: TemplateDelegate;

  export default template;
}

declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "uuid";
