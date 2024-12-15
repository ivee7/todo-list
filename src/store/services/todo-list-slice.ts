import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TTodoListItem = {
    id: string
    done: boolean
    text: string
}

export type TTodoList = TTodoListItem[];

type TSorts = {
    done: boolean | string
    searchText: string
}

export type TodoListState = {
    todoList: TTodoList
    sorts: TSorts
    addModalOpen: boolean
};

const initialState: TodoListState = {
    todoList: [],
    sorts: {
        done: 'all',
        searchText: '',
    },
    addModalOpen: false,
};

export function comparator(item: TTodoListItem, sorts: TSorts) {
    return item.text.includes(sorts.searchText) && (item.done === sorts.done || sorts.done === 'all');
}

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        clearCompleted: (state) => {
            state.todoList = state.todoList.filter(({ done }) => !done);
        },
        deleteItem: (state, action: PayloadAction<{ id: string }>) => {
            state.todoList = state.todoList.filter(({ id }) => id !== action.payload.id);
        },
        setItem: (state, action: PayloadAction<{ text: string }>) => {
            const newItem: TTodoListItem = {
                text: action.payload.text,
                done: false,
                id: `id${new Date().getTime()}`
            };
            state.todoList = [ ...state.todoList, newItem];
        },
        setSort: (state, action: PayloadAction<{ sortName: keyof TSorts, value: string | boolean }>) => {
            state.sorts = {
                ...state.sorts,
                [action.payload.sortName]: action.payload.value,
            }
        },
        toggleStatus: (state, action: PayloadAction<{ id: string }>) => {
            state.todoList = state.todoList.map((item) => {
                const { id, done } = item;
                if (id === action.payload.id) return { ...item, done: !done }
                return item;
            });
        },
        toggleModal: (state, action: PayloadAction<boolean>) => {
            state.addModalOpen = action.payload;
        },
    },
});

export const {
    clearCompleted,
    deleteItem,
    setItem,
    setSort,
    toggleModal,
    toggleStatus,
} = todoListSlice.actions;

export default todoListSlice.reducer;
