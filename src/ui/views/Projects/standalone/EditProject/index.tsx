import * as React from 'react';

import { useUpdateProject } from '@/application/usecases/useUpdateProject';
import {
  ProjectEditor,
  SubmitParams,
  Form,
} from '@/ui/views/Projects/standalone/ProjectEditor';
import { useProject } from '@/ui/modules/hooks/useProject';

type Props = {
  projectId: UniqueId;
  onSubmitSuccess: () => void;
  onClose: () => void;
};

export function EditProject({ projectId, onSubmitSuccess, onClose }: Props) {
  const { updateProject } = useUpdateProject();
  const { project } = useProject({ id: projectId });

  const initialValue = React.useMemo(() => {
    if (!project) {
      return undefined;
    }

    const value: Form = {
      title: project.title,
      assigneeIds: project.assignees?.map((user) => user.id) || [],
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
    };
    return value;
  }, [project]);

  const handleSubmit = React.useCallback(
    async (params: SubmitParams) => {
      await updateProject({
        id: projectId,
        project: {
          title: params.title,
          description: params.description,
          startDate: params.startDate,
          endDate: params.endDate,
        },
        assigneeIds: params.assigneeIds,
      });
      onSubmitSuccess();
    },
    [projectId, updateProject, onSubmitSuccess],
  );

  return (
    <ProjectEditor
      initialValue={initialValue}
      onSubmit={handleSubmit}
      onCancel={onClose}
    />
  );
}
