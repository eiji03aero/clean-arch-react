import * as React from 'react';

import * as pjDmn from '@/domain/Project';
import { useProjectsService } from '@/services/adapters/useProjectsService';
import { useUserProjectService } from '@/services/adapters/useUserProjectService';

export function useUpdateProject() {
  const projectsService = useProjectsService();
  const userProjectService = useUserProjectService();

  const updateProject = React.useCallback(
    async (params: {
      id: UniqueId;
      project: pjDmn.UpdateProjectParams;
      assigneeIds: number[];
    }) => {
      const project = await projectsService.findById(params.id);
      const updatedProject = pjDmn.updateProject(project!, params.project);
      await projectsService.update(updatedProject);

      await userProjectService.registerUsers({
        projectId: updatedProject.id,
        assigneeIds: params.assigneeIds,
      });
    },
    [projectsService, userProjectService],
  );

  return React.useMemo(
    () => ({
      updateProject,
    }),
    [updateProject],
  );
}
