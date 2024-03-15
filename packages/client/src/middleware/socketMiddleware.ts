import { io } from "socket.io-client";
import { BACK_URL } from "../utils/ip.ts";

export enum SocketActionTypes {
  CONNECT = "socket/connect",
  DISCONNECT = "socket/disconnect",
  EMIT = "socket/emit",
  ON = "socket/on",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const socketMiddleware = (store: any) => (next: any) => (action: any) => {
  const { type } = action;
  const { socket, setSocket, resetSocket } = store.getState().rootReducer;

  switch (type) {
    case SocketActionTypes.CONNECT:
      console.log('connect ask')
      if (!socket) {
      console.log('connect launch')
      setSocket(io(`ws://${BACK_URL}:4567`, { transports: ['websocket'], query: {username: action.data.username ,room: action.data.room} }));
      }
      break;
    case SocketActionTypes.DISCONNECT:
      console.log('disconnect ask')
      if (socket) {
      console.log('disconnect launch')
      socket.disconnect();
        resetSocket();
      }
      break;
    case SocketActionTypes.EMIT:
      console.log('emit ask')
      if (socket) {
        console.log('event emit')
        socket.emit(action.event, action.data);
      }
      break;
    case SocketActionTypes.ON:
      console.log('on ask')
      if (socket) {
      console.log('on launch')
      socket.on(action.event, action.callback);
      }
      break;
    default:
      break;
  }

  return next(action);
};