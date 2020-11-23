import { action, observable } from "mobx";

interface UserMessage {
  description: string;
  id: number;
  title: string;
}

interface userMessages {
  messages: UserMessage[];
}

class UserMessages implements userMessages {
  @observable public messages: UserMessage[] = [];
  @observable public unreadCount: number = 0;

  @action.bound setUserMessages(messages: UserMessage[]) {
    this.messages.splice(0, this.messages.length, ...messages);
  }
  @action.bound setUnreadCount(count: number) {
    this.unreadCount = count;
  }
}

export default new UserMessages();
