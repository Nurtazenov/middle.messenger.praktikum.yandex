import Block from "../tools/Block.ts";
import { router, routs } from "../tools/Router.ts";
import template from './error.hbs'
import './error.scss'
interface ErrorPageProps {
  errorCode: string;
  description: string;
}

export default class setErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
      onButtonClick: (e: Event) => {
        e.preventDefault();
        router.go(routs.login)
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
