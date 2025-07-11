import { ChatInfo } from "../../api/chat-api";
import Block from "../../tools/Block";
import { withStore } from "../../tools/Store";
import template from './leftSide.hbs';
import './leftSide.scss';
interface ILeftPanel{
  chats: ChatInfo[]
}
export class LeftPanel extends Block {
  constructor(props:ILeftPanel ) {
    super({
      ...props,
      chats: props.chats
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: { chats: ChatInfo[] }) => {
  return {
    chats: state.chats,
  };
};

export default withStore(mapStateToProps)(LeftPanel);
