import * as React from 'react';
import {
  Button,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

import * as taskDmn from '@/domain/Task';

import { UsersSelect } from '@/ui/modules/standalone/UsersSelect';
import { ProjectSelect } from '@/ui/modules/standalone/ProjectSelect';
import { TaskStatusSelect } from '@/ui/modules/standalone/TaskStatusSelect';

export type Form = {
  title: string;
  projectId: UniqueId | null;
  status: taskDmn.TaskStatus | null;
  assigneeIds: number[];
  description: string;
};

export type SubmitParams = {
  title: string;
  projectId: UniqueId;
  status: taskDmn.TaskStatus;
  assigneeIds: number[];
  description: string;
};

type Props = {
  initialValue?: Form;
  onSubmit: (params: SubmitParams) => void;
  onCancel: () => void;
};

export function TaskEditor({ initialValue, onSubmit, onCancel }: Props) {
  const [form, setForm] = React.useState<Form>({
    title: '',
    projectId: null,
    status: 'not_started',
    assigneeIds: [],
    description: '',
  });

  const handleSetFormItem = (
    key: string,
    value: string | Date | number[] | number | null,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.projectId || !form.status) {
      return;
    }

    onSubmit({
      title: form.title,
      projectId: form.projectId,
      status: form.status,
      assigneeIds: form.assigneeIds,
      description: form.description,
    });
  };

  React.useEffect(() => {
    if (!initialValue) {
      return;
    }

    setForm(initialValue);
  }, [initialValue]);

  return (
    <Flex flexDir="column" px={4} h="100%">
      <Stack flex={1} minHeight={0} overflow="auto" spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={form.title}
            onChange={(e) => handleSetFormItem('title', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Project</FormLabel>
          <ProjectSelect
            selectedId={form.projectId}
            onChange={(id) => handleSetFormItem('projectId', id)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <TaskStatusSelect
            value={form.status}
            onChange={(status) => handleSetFormItem('status', status)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Assignees</FormLabel>
          <UsersSelect
            selectedIds={form.assigneeIds}
            onChange={(ids) => handleSetFormItem('assigneeIds', ids)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={form.description}
            onChange={(e) => handleSetFormItem('description', e.target.value)}
          />
        </FormControl>
      </Stack>

      <Flex justifyContent="space-between" py={4}>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
        <Button colorScheme="blackAlpha" onClick={onCancel}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
}
