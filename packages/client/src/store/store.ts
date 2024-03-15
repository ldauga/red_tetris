import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "../middleware/socketMiddleware";
import { Socket } from "socket.io-client";


export const store = configureStore({
  reducer: {
    // Add reducers here
    rootReducer: (state = {
      // Add initial state here
      socket: null,
      resetSocket: () => {
        state.socket = null;
      },
      setSocket: (socket: Socket) => {
        state.socket = socket;
      }
    }) => state,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    .concat(socketMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch