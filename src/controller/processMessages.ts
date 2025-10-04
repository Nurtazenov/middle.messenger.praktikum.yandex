import { IMessage } from "../Chats/RightSide/message/message.interface.ts";

export default function processMessages(
    messages: Array<IMessage>
  ): Array<IMessage> {
    return messages.map((message, index, arr) => {
      const currentDate = new Date(message.time).toDateString();
      const previousDate =
        index > 0 ? new Date(arr[index - 1].time).toDateString() : null;
  
      if (index === 0 || currentDate !== previousDate) {
        return { ...message, showDate: true };
      } else {
        return { ...message, showDate: false };
      }
    });
  }
