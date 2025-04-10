import './auth.scss';
import Handlebars from 'handlebars';
import templateSourse from "./input.hbs?raw"
import { validates } from './validates';
const template = Handlebars.compile(templateSourse);
const html = template(validates)
export function setRegister(element: HTMLDivElement) {
  element.innerHTML = html;
  const form = document.getElementById('getLog') as HTMLFormElement;
  form.addEventListener('submit', (event:any) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data:Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data);
  });
  
}
