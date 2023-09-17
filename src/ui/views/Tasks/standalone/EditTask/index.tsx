import * as React from 'react';

import { useUpdateTask } from '@/application/usecases/useUpdateTask';
import {
  TaskEditor,
  SubmitParams,
  Form,
} from '@/ui/views/Tasks/standalone/TaskEditor';
import { useTask } from '@/ui/modules/hooks/useTask';

type Props = {
  taskId: UniqueId;
  onSubmitSuccess: () => void;
  onClose: () => void;
};

export function EditTask({ taskId, onSubmitSuccess, onClose }: Props) {
  const { updateTask } = useUpdateTask();
  const { task } = useTask({ id: taskId });

  const initialValue = React.useMemo(() => {
    if (!task) {
      return undefined;
    }

    const value: Form = {
      title: task.title,
      projectId: task.projectId,
      status: task.status,
      assigneeIds: task.assignees?.map((user) => user.id) || [],
      description: task.description,
    };
    return value;
  }, [task]);

  const handleSubmit = React.useCallback(
    async (params: SubmitParams) => {
      await updateTask({
        id: taskId,
        task: {
          title: params.title,
          projectId: params.projectId,
          status: params.status,
          description: params.description,
        },
        assigneeIds: params.assigneeIds,
      });
      onSubmitSuccess();
    },
    [taskId, updateTask, onSubmitSuccess],
  );

  return (
    <TaskEditor
      initialValue={initialValue}
      onSubmit={handleSubmit}
      onCancel={onClose}
    />
  );
}
