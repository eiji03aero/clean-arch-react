import * as React from 'react';

import { useProjectsService } from '@/services/adapters/useProjectsService';

export function useRemoveProject() {
  const projectsService = useProjectsService();

  const removeProject = React.useCallback(
    async (id: UniqueId) => {
      await projectsService.remove(id);
    },
    [projectsService],
  );

  return React.useMemo(
    () => ({
      removeProject,
    }),
    [removeProject],
  );
}
