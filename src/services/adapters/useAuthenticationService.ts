import * as React from 'react';

import { AuthenticationService } from '@/application/ports';
import * as authApis from '@/services/apis/auth';

export function useAuthenticationService(): AuthenticationService {
  const login = React.useCallback(async (id: UniqueId) => {
    return authApis.authenticate(id);
  }, []);

  return React.useMemo(
    () => ({
      login,
    }),
    [login],
  );
}
