
import Block from '../../tools/Block.ts';
import template from './form.hbs';

interface FormProps {
  onSubmit: () => void;
  events: {
    submit: () => void;
  };
}
export default class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit
      }
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
