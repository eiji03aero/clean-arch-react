import * as React from 'react';
import AsyncSelect from 'react-select/async';

import { useProjectsService } from '@/services/adapters/useProjectsService';

import { useProjects } from '@/ui/modules/hooks/useProjects';

type Option = { label: string; value: number };

type Props = {
  selectedId: UniqueId | null;
  onChange: (id: UniqueId | null) => void;
};

export function ProjectSelect({ selectedId, onChange }: Props) {
  const projectsService = useProjectsService();
  const { projects } = useProjects();

  const loadOptions = React.useCallback(async () => {
    const projects = await projectsService.findAll();
    const options = projects.map((project) => ({
      label: project.title,
      value: project.id,
    }));
    return options;
  }, [projectsService]);

  const handleChange = React.useCallback(
    (option: Option | null) => {
      onChange(option ? option.value : null);
    },
    [onChange],
  );

  const value = React.useMemo(() => {
    if (!projects) {
      return undefined;
    }

    const project = projects.find((project) => project.id === selectedId);
    if (!project) {
      return undefined;
    }

    return { label: project.title, value: project.id };
  }, [selectedId, projects]);

  return (
    <AsyncSelect<Option, false>
      defaultOptions
      value={value}
      loadOptions={loadOptions}
      onChange={handleChange}
    />
  );
}
