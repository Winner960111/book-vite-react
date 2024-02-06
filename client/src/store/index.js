import { configureStore } from '@reduxjs/toolkit';
import checkerSlice from './reducers/checker';

const store = configureStore({
  reducer: {
    checker: checkerSlice,
  },
});

export const { dispatch } = store;

export default store;
