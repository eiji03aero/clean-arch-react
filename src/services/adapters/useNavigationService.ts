import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { NavigationService } from '@/application/ports';

export function useNavigationService(): NavigationService {
  const navigate = useNavigate();
  const location = useLocation();

  const push = React.useCallback(
    async (path: URLPath) => {
      navigate(path);
    },
    [navigate],
  );

  const getPath = React.useCallback(() => {
    return location.pathname;
  }, [location.pathname]);

  return React.useMemo(
    () => ({
      push,
      getPath,
    }),
    [push, getPath],
  );
}
