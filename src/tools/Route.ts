import { render } from "../components/dom/render";
import Block from "./Block";


function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}
export default class Route {
    private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly blockClass: typeof Block,
    private readonly query: string
  ) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block as Block);
      return;
    }
  }
}






