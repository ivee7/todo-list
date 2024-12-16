import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { store } from './store';
import router from './router/router';
import './api';
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StyledEngineProvider injectFirst>
      <StoreProvider store={store}>
        <RouterProvider router={router} />
      </StoreProvider>
    </StyledEngineProvider>,
)
