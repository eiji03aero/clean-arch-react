import * as React from 'react';

import { useSessionStorage } from '@/services/adapters/useSessionStorage';
import { useUsersService } from '@/services/adapters/useUsersService';

export function useRestoreSession() {
  const sessionStorage = useSessionStorage();
  const usersService = useUsersService();

  const tryRestoreSession = React.useCallback(async () => {
    if (!sessionStorage.isLoggedIn()) {
      return;
    }

    const userId = sessionStorage.getSessionUserId();
    if (!userId) {
      return;
    }

    const user = await usersService.findById(userId);
    if (!user) {
      return;
    }

    sessionStorage.persistSession(user.id);
    sessionStorage.setCurrentUser(user);
  }, [sessionStorage, usersService]);

  return React.useMemo(
    () => ({
      tryRestoreSession,
    }),
    [tryRestoreSession],
  );
}
