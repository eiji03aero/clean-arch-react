import * as React from 'react';
import { Box, Heading, Stack, Button, Flex } from '@chakra-ui/react';

import { useRemoveTask } from '@/application/usecases/useRemoveTask';

import { useTasks } from '@/ui/modules/hooks/useTasks';
import { TaskCard } from '@/ui/views/Tasks/components/TaskCard';
import { CreateTask } from '@/ui/views/Tasks/standalone/CreateTask';
import { EditTask } from '@/ui/views/Tasks/standalone/EditTask';

export function TasksView() {
  const [mode, setMode] = React.useState<'list' | 'create' | 'edit'>('list');
  const [editingId, setEditingId] = React.useState<UniqueId | null>(null);
  const { tasks, refetch } = useTasks();
  const { removeTask } = useRemoveTask();

  const handleStartCreate = React.useCallback(() => {
    setMode('create');
  }, []);

  const handleStartEdit = React.useCallback((id: UniqueId) => {
    setMode('edit');
    setEditingId(id);
  }, []);

  const handleCloseEditor = React.useCallback(() => {
    setMode('list');
    setEditingId(null);
    refetch();
  }, [refetch]);

  const handleDelete = React.useCallback(
    async (id: UniqueId) => {
      await removeTask(id);
      refetch();
    },
    [refetch, removeTask],
  );

  return (
    <Flex flexDir="column" h="100%">
      <Heading as="h1" mb={4} px={4} pt={4}>
        Tasks
      </Heading>

      <Box mb={4} px={4}>
        <Button colorScheme="blue" onClick={handleStartCreate}>
          Create
        </Button>
      </Box>

      <Flex flex={1} minHeight={0}>
        <Box flex={1}>
          <Stack spacing={4} px={4} overflow="auto" h="100%" minHeight={0}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleStartEdit}
                onDelete={handleDelete}
              />
            ))}
          </Stack>
        </Box>

        {mode === 'create' && (
          <Box flex={1}>
            <CreateTask
              onSubmitSuccess={handleCloseEditor}
              onClose={handleCloseEditor}
            />
          </Box>
        )}

        {mode === 'edit' && editingId && (
          <Box flex={1}>
            <EditTask
              taskId={editingId}
              onSubmitSuccess={handleCloseEditor}
              onClose={handleCloseEditor}
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
