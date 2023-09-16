import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NavLayout } from './ui/layouts/NavLayout';
import { AuthenticatedRoute } from './ui/modules/components/AuthenticatedRoute';
import { DashboardView } from './ui/views/Dashboard';
import { LoginView } from './ui/views/Login';

import './ui/styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavLayout />,
    children: [
      {
        path: '',
        element: <AuthenticatedRoute element={<DashboardView />} />,
      },
      {
        path: 'login',
        element: <LoginView />,
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
