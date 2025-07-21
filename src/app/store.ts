import { configureStore } from '@reduxjs/toolkit';
import fieldsReducer from '../features/fields/fieldsSlice';

export const store = configureStore({
  reducer: {
    fields: fieldsReducer,
  },
});

// Types for components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
