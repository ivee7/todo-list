import { createBrowserRouter } from 'react-router-dom';
import { APP_ROUTES } from './routes';
import { TodoList } from '../pages/todo-list';
import { Layout } from '../layouts/layout';

export default createBrowserRouter([
    {
        path: APP_ROUTES.ROOT,
        element: <Layout />,
        children: [
            {
                path: APP_ROUTES.ROOT,
                element: <TodoList />
            }
        ],
    },
]);
