import { Stack, Button } from '@mui/material';
import { TodoListItem } from './components/todo-list-item';
import { TTodoListItem, comparator, deleteItem, toggleStatus, toggleModal } from '../../store/services/todo-list-slice';
import { useAppSelector, useAppDispatch } from '../../store';
import { TodoListSearch } from './components/todo-list-search/TodoListSearch';
import { TodoListPanel } from './components/todo-list-panel/TodoListPanel';
import { TodoListAddModal } from './components/todo-list-add-modal/TodoListAddModal';
import './index.scss';

export const TodoList = () => {
    const {
        todoList,
        sorts,
    } = useAppSelector((state) => state.todoList);
    const dispatch = useAppDispatch();

    const onDelete = (id: string) => {
        dispatch(deleteItem({ id }));
    };

    const onToggleStatus = (id: string) => {
        dispatch(toggleStatus({ id }));
    };

    return (
        <>
            <div className='todo-list'>
                <Stack
                    spacing={2}
                    sx={{ maxWidth: "600px", margin: '0 auto' }}
                >
                    <Button
                        onClick={() => dispatch(toggleModal(true))}
                        sx={{ alignSelf: "flex-end" }}
                    >
                        Добавить задачу
                    </Button>
                    <TodoListSearch />
                    <TodoListPanel />
                    <div className='todo-list__items-wrapper'>
                        {
                            todoList?.length
                            ? todoList
                                .filter((item: TTodoListItem) => comparator(item, sorts))
                                .map((item: TTodoListItem) => (
                                    <TodoListItem
                                        {...item}
                                        key={item.id}
                                        onDelete={onDelete}
                                        onToggleStatus={onToggleStatus}
                                    />
                                ))
                            : <div className='todo-list__empty'>Задач нет</div>
                        }
                    </div>
                </Stack>
            </div>
            <TodoListAddModal />
        </>
    );
};
