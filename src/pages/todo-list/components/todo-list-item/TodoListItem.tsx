import { FC } from 'react';
import { Checkbox, FormControlLabel, Button } from '@mui/material';
import type { TTodoListItem } from '../../../../store/services/todo-list-slice';
import './index.scss';

type TodoListItemProps = TTodoListItem & {
    onDelete: (id: string) => void
    onToggleStatus: (id: string) => void
}

export const TodoListItem: FC<TodoListItemProps> = ({ done, text, id, onToggleStatus, onDelete }) => {
    return (
        <div className='todo-list-item'>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={done}
                        color="success"
                        onChange={() => onToggleStatus(id)}
                    />
                }
                sx={{
                    wordBreak: 'break-all'
                }}
                label={text}
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={() => onDelete(id)}
                sx={{ flexShrink: 0 }}
            >
                Удалить
            </Button>
        </div>
    );
};
