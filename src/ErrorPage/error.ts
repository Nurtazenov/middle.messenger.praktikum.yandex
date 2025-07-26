import Block from "../tools/Block";
import { router, routs } from "../tools/Router";
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
        router.go(routs.messenger)
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
