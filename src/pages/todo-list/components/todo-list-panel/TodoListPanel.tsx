import { Button, Stack } from '@mui/material';
import { setSort, clearCompleted } from '../../../../store/services/todo-list-slice';
import { useAppDispatch, useAppSelector } from '../../../../store';

export const TodoListPanel = () => {
    const {
        sorts,
    } = useAppSelector((state) => state.todoList);
    const dispatch = useAppDispatch();

    const sort = [
        { title: 'Все', value: 'all', id: 'all' },
        { title: 'Выполненные', value: true, id: 'completed' },
        { title: 'Нужно сделать', value: false, id: 'uncompleted' },
    ]

    return (
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            {sort.map(({ title, value, id }) => (
                <Button
                    key={id}
                    variant={sorts.done === value ? 'outlined' : 'text'}
                    onClick={() => dispatch(setSort({ sortName: 'done', value }))}
                >
                    { title }
                </Button>
            ))}
            <Button
                color="error"
                onClick={() => dispatch(clearCompleted())}
            >
                Удалить выполенные
            </Button>
        </Stack >
    );
}