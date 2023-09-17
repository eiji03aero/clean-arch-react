import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NavLayout } from './ui/layouts/NavLayout';
import { AuthenticatedRoute } from './ui/modules/components/AuthenticatedRoute';
import { LoginView } from './ui/views/Login';
import { DashboardView } from './ui/views/Dashboard';
import { ProjectsView } from './ui/views/Projects';

import './ui/styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavLayout />,
    children: [
      {
        path: 'login',
        element: <LoginView />,
      },
      {
        path: '',
        element: <AuthenticatedRoute element={<DashboardView />} />,
      },
      {
        path: 'projects',
        element: <AuthenticatedRoute element={<ProjectsView />} />,
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
