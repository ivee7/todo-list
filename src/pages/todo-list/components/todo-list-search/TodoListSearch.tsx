import React from 'react';
import { TextField } from '@mui/material';
import { setSort } from '../../../../store/services/todo-list-slice';
import { useAppSelector, useAppDispatch } from '../../../../store';

export const TodoListSearch = () => {
    const { sorts } = useAppSelector((state) => state.todoList);
    const dispatch = useAppDispatch();

    const onDelete = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSort({ sortName: 'searchText', value: event.target.value }));
    };

    return (
        <TextField
            label="Поиск по задачам..."
            type="search"
            value={sorts.searchText}
            onChange={onDelete}
        />
    );
}