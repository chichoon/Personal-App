import { configureStore } from '@reduxjs/toolkit';
import todo from './todo';

export const store = configureStore({
  reducer: {
    todo,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
