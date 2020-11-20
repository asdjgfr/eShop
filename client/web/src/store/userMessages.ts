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

  @action.bound setUserMessages(messages: UserMessage[]) {
    this.messages.splice(0, this.messages.length, ...messages);
  }
}

export default new UserMessages();
