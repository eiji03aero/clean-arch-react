import * as React from 'react';
import { atom, useRecoilState } from 'recoil';

import * as userDmn from '@/domain/User';
import { SessionStorage } from '@/application/ports';

type State = {
  currentUser: userDmn.User | undefined;
};

const SessionState = atom<State>({
  key: 'SessionState',
  default: {
    currentUser: undefined,
  },
});

export function useSessionStorage(): SessionStorage {
  const [session, setSession] = useRecoilState(SessionState);
  const LSKey = 'session-login-user-id';

  const isLoggedIn = React.useCallback(() => {
    const id = window.localStorage.getItem(LSKey);
    return id !== null;
  }, [LSKey]);

  const getSessionUserId = React.useCallback(() => {
    const id = window.localStorage.getItem(LSKey);
    if (id === null) {
      return null;
    }

    return JSON.parse(id);
  }, []);

  const persistSession = React.useCallback((id: UniqueId) => {
    window.localStorage.setItem(LSKey, JSON.stringify(id));
  }, []);

  const revokeSession = React.useCallback(() => {
    window.localStorage.removeItem(LSKey);
  }, []);

  const setCurrentUser = React.useCallback((user: userDmn.User | undefined) => {
    setSession((prev) => ({ ...prev, currentUser: user }));
  }, []);

  return React.useMemo(
    () => ({
      currentUser: session.currentUser,
      isLoggedIn,
      getSessionUserId,
      persistSession,
      revokeSession,
      setCurrentUser,
    }),
    [
      session.currentUser,
      isLoggedIn,
      getSessionUserId,
      persistSession,
      revokeSession,
      setCurrentUser,
    ],
  );
}
