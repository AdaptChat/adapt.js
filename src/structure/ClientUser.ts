import { OpCodes } from "../config";
import { IUser } from "../types";
import { User } from "./User";

/**
 * The current client user connected to Adapt.
 */
export class ClientUser extends User {
  /**
   * Creates a new instance of a ClientUser.
   * @param data The data for the user.
   */
  constructor(data: IUser) {
    super(data);
  }

    /**
   * Sets the presence of the client user.
   * @param presence The presence to set.
   */
    public async setPresence(presence: string) {
      await this.client.ws.send({ data: { op: OpCodes.PRESENCE, status: presence }});
    }
}