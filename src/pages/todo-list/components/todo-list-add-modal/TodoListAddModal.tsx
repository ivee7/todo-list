import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Stack, TextField, Button, Box } from '@mui/material';
import { toggleModal, createItem } from '../../../../store/services/todo-list-slice';
import { useAppSelector, useAppDispatch } from '../../../../store';

type TodoListFormValues = {
    text: string
}

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
}

export const TodoListAddModal = () => {
    const {
        addModalOpen,
    } = useAppSelector((state) => state.todoList);
    const dispatch = useAppDispatch();

    const form = useForm<TodoListFormValues>({
        defaultValues: {
            text: '',
        }
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState]);

    const onSubmit = (data: TodoListFormValues) => {
        dispatch(createItem(data.text));
        dispatch(toggleModal(false));
    }

    return (
        <Modal
            open={addModalOpen}
            onClose={() => dispatch(toggleModal(false))}
        >
            <Box sx={boxStyle}>
                <form onSubmit={handleSubmit(onSubmit)} className='border border-slate-200 rounded-lg bg-slate-50 p-4 w-fit'>
                    <Stack spacing={2} width={400}>
                        <TextField
                            label='Текст задачи'
                            {...register('text', {
                            required: 'Необходимо ввести текст задачи'
                            })}
                            error={!!errors.text}
                            helperText={errors.text?.message}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            Добавить
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}