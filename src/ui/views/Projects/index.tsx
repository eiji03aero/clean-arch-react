import * as React from 'react';
import { Box, Heading, Stack, Button, Flex } from '@chakra-ui/react';

import { useRemoveProject } from '@/application/usecases/useRemoveProject';

import { useProjects } from '@/ui/modules/hooks/useProjects';
import { ProjectCard } from '@/ui/views/Projects/components/ProjectCard';
import { CreateProject } from '@/ui/views/Projects/standalone/CreateProject';
import { EditProject } from '@/ui/views/Projects/standalone/EditProject';

export function ProjectsView() {
  const [mode, setMode] = React.useState<'list' | 'create' | 'edit'>('list');
  const [editingId, setEditingId] = React.useState<UniqueId | null>(null);
  const { projects, refetch } = useProjects();
  const { removeProject } = useRemoveProject();

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
  }, []);

  const handleDelete = React.useCallback(
    async (id: UniqueId) => {
      await removeProject(id);
      refetch();
    },
    [removeProject, refetch],
  );

  return (
    <Flex flexDir="column" h="100%">
      <Heading as="h1" mb={4} px={4} pt={4}>
        Projects
      </Heading>

      <Box mb={4} px={4}>
        <Button colorScheme="blue" onClick={handleStartCreate}>
          Create
        </Button>
      </Box>

      <Flex flex={1} minHeight={0}>
        <Box flex={1}>
          <Stack spacing={4} px={4} overflow="auto" h="100%" minHeight={0}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleStartEdit}
                onDelete={handleDelete}
              />
            ))}
          </Stack>
        </Box>
        {mode === 'create' && (
          <Box flex={1}>
            <CreateProject
              onSubmitSuccess={handleCloseEditor}
              onClose={handleCloseEditor}
            />
          </Box>
        )}
        {mode === 'edit' && editingId && (
          <Box flex={1}>
            <EditProject
              projectId={editingId}
              onSubmitSuccess={handleCloseEditor}
              onClose={handleCloseEditor}
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
