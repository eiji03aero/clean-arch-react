import * as React from 'react';
import { Navigate } from 'react-router-dom';

import { useSessionStorage } from '@/services/adapters/useSessionStorage';

type Props = {
  element: React.ReactNode;
};

export function AuthenticatedRoute({ element }: Props) {
  const sessionStorage = useSessionStorage();

  if (!sessionStorage.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
