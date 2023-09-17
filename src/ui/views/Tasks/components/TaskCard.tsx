import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Flex,
  Button,
  Stack,
} from '@chakra-ui/react';

import * as taskDmn from '@/domain/Task';

import { TaskStatusBadge } from '@/ui/views/Tasks/components/TaskStatusBadge';

type Props = {
  task: taskDmn.Task;
  onEdit: (id: UniqueId) => void;
  onDelete: (id: UniqueId) => void;
};

export function TaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <Heading size="md" mr={2}>
              {task.id}: {task.title}
            </Heading>
            <TaskStatusBadge status={task.status} />
          </Flex>
          <Stack direction="row" spacing={4}>
            <Button colorScheme="blackAlpha" onClick={() => onEdit(task.id)}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => onDelete(task.id)}>
              Delete
            </Button>
          </Stack>
        </Flex>
      </CardHeader>
      <CardBody pt={0}>
        <Text fontSize="sm">{task.project?.title}</Text>
      </CardBody>
    </Card>
  );
}
