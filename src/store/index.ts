import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './services';
import { TodoListState } from './services/todo-list-slice';

export type RootState = {
    todoList: TodoListState;
};

export const store = configureStore({ reducer });


export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
