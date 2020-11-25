import { makeAutoObservable } from "mobx";

interface UserMessage {
  description: string;
  id: number;
  title: string;
}

interface userMessages {
  messages: UserMessage[];
}

class UserMessages implements userMessages {
  public messages: UserMessage[] = [];
  public unreadCount: number = 0;
  constructor() {
    makeAutoObservable(this);
  }
  setUserMessages(messages: UserMessage[]) {
    this.messages.splice(0, this.messages.length, ...messages);
  }
  setUnreadCount(count: number) {
    this.unreadCount = count;
  }
}

export default new UserMessages();
