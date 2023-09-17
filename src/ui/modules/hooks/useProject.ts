import * as React from 'react';

import * as pjDmn from '@/domain/Project';
import { useProjectsService } from '@/services/adapters/useProjectsService';

type Params = {
  id: UniqueId;
};

export function useProject({ id }: Params) {
  const [project, setProject] = React.useState<pjDmn.Project | null>(null);
  const projectsService = useProjectsService();

  const fetch = React.useCallback(async () => {
    const project = await projectsService.findById(id);
    setProject(project!);
  }, [projectsService, id]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    project,
    refetch: fetch,
  };
}
