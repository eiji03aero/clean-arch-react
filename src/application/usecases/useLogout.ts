import * as React from 'react';

import { useSessionStorage } from '@/services/adapters/useSessionStorage';
import { useNavigationService } from '@/services/adapters/useNavigationService';

export function useLogout() {
  const sessionStorage = useSessionStorage();
  const navigationService = useNavigationService();

  const logout = React.useCallback(async () => {
    sessionStorage.revokeSession();
    sessionStorage.setCurrentUser(undefined);
    navigationService.push('/login');
  }, [sessionStorage, navigationService]);

  return React.useMemo(
    () => ({
      logout,
    }),
    [logout],
  );
}
