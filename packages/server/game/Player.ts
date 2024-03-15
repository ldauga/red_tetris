import { Socket } from "socket.io";

class Player {
  private readonly _name: string;
  private readonly _socket: Socket;

  constructor(name: string, socket: Socket) {
    this._name = name;
    this._socket = socket;
  }




  ////////////////////////////////////////////
  //////////         GETTER         //////////
  ////////////////////////////////////////////

  public get name() {
    return this._name;
  }

  public get socket() {
    return this._socket;
  }

}

export default Player;
