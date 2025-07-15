import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '@entities/task/models/taskSlice';
import { saveTasksToLocalStorage } from '@shared/lib/localStorage';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

store.subscribe(() => saveTasksToLocalStorage(store.getState().tasks));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
