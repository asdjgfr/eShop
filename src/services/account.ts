import { Account } from "appwrite";
import { client } from "@/plugins/appwrite";

const account = new Account(client);

export function signInWidthEmail(email: string, password: string) {
  return account.createEmailSession(email, password);
}
