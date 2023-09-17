import * as React from 'react';

import * as pjDmn from '@/domain/Project';
import { useProjectsService } from '@/services/adapters/useProjectsService';
import { useUserProjectService } from '@/services/adapters/useUserProjectService';

export function useCreateProject() {
  const projectsService = useProjectsService();
  const userProjectService = useUserProjectService();

  const createProject = React.useCallback(
    async (params: {
      project: pjDmn.CreateProjectParams;
      assigneeIds: number[];
    }) => {
      const project = pjDmn.createProject(params.project);
      const id = await projectsService.create(project);

      await userProjectService.registerUsers({
        projectId: id,
        assigneeIds: params.assigneeIds,
      });
    },
    [projectsService, userProjectService],
  );

  return React.useMemo(
    () => ({
      createProject,
    }),
    [createProject],
  );
}
