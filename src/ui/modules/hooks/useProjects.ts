import * as React from 'react';

import * as pjDmn from '@/domain/Project';
import { useProjectsService } from '@/services/adapters/useProjectsService';

export function useProjects() {
  const [projects, setProjects] = React.useState<pjDmn.Project[]>([]);
  const projectsService = useProjectsService();

  const fetch = React.useCallback(async () => {
    const projects = await projectsService.findAll();
    setProjects(projects);
  }, [projectsService]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    projects,
    refetch: fetch,
  };
}
