import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import TodoListDB from '../../api/todo-list/index';

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

export const getItems = createAsyncThunk<TTodoList, undefined>(
    'todoList/getItems',
    async () => {
        return await TodoListDB.getItems();
    }
)

export const clearCompleted = createAsyncThunk<TTodoList, undefined>(
    'todoList/clearCompleted',
    async (_, { dispatch }) => {
        const response = await TodoListDB.clearCompleted();

        if (response) {
            const { payload } = await dispatch(getItems());
            return payload;
        }
        return [];
    }
)

export const deleteItem = createAsyncThunk<TTodoList, TTodoListItem['id']>(
    'todoList/deleteItem',
    async (id: TTodoListItem['id'], { dispatch }) => {
        const response = await TodoListDB.deleteItem(id);

        if (response) {
            const { payload } = await dispatch(getItems());
            return payload;
        }
        return [];
    }
)

export const createItem = createAsyncThunk<TTodoList, TTodoListItem['text']>(
    'todoList/createItem',
    async (text: TTodoListItem['text'], { dispatch }) => {
        const response = await TodoListDB.createItem(text);

        if (response) {
            const { payload } = await dispatch(getItems());
            return payload;
        }
        return [];
    }
)

export const toggleStatus = createAsyncThunk<TTodoList, TTodoListItem['id']>(
    'todoList/toggleStatus',
    async (id: TTodoListItem['id'], { dispatch }) => {
        const response = await TodoListDB.toggleStatus(id);

        if (response) {
            const { payload } = await dispatch(getItems());
            return payload;
        }
        return [];
    }
)

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        clearCompleted: (state) => {
            state.todoList = state.todoList.filter(({ done }) => !done);
        },
        setSort: (state, action: PayloadAction<{ sortName: keyof TSorts, value: string | boolean }>) => {
            state.sorts = {
                ...state.sorts,
                [action.payload.sortName]: action.payload.value,
            }
        },
        toggleModal: (state, action: PayloadAction<boolean>) => {
            state.addModalOpen = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getItems.fulfilled, (state, action) => {
                state.todoList = action.payload;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.todoList = action.payload;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.todoList = action.payload;
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                state.todoList = action.payload;
            })
            .addCase(clearCompleted.fulfilled, (state, action) => {
                state.todoList = action.payload;
            })
    }
});

export const { setSort, toggleModal } = todoListSlice.actions;

export default todoListSlice.reducer;
