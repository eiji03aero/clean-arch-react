import * as React from 'react';

import { useAuthenticationService } from '@/services/adapters/useAuthenticationService';
import { useSessionStorage } from '@/services/adapters/useSessionStorage';
import { useNavigationService } from '@/services/adapters/useNavigationService';

export function useLogin() {
  const sessionStorage = useSessionStorage();
  const navigationService = useNavigationService();
  const authenticationService = useAuthenticationService();

  const login = React.useCallback(
    async (id: UniqueId) => {
      const user = await authenticationService.login(id);
      sessionStorage.persistSession(user.id);
      sessionStorage.setCurrentUser(user);
      navigationService.push('/');
    },
    [sessionStorage, navigationService, authenticationService],
  );

  return React.useMemo(
    () => ({
      login,
    }),
    [login],
  );
}
