import { IUser } from "../types";
import { User } from "./User";

/**
 * The current client user connected to Adapt.
 */
export class ClientUser extends User {
  /**
   * The email of the client user.
   */
  public email: string;

  /**
   * Creates a new instance of a ClientUser.
   * @param data The data for the user.
   */
  constructor(data: IUser) {
    super(data);
    this.email = data.email!;

  }
}