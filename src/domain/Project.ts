import * as userDmn from '@/domain/User';
import { datetimeNow } from '@/lib/datetime';

type ProjectTitle = string;
type ProjectDescription = string;

export type Project = {
  id: UniqueId;
  title: ProjectTitle;
  description: ProjectDescription;
  startDate: Date;
  endDate: Date;
  // useTaskProgress: boolean;
  createdAt: Date;
  updatedAt: Date;
  assignees?: userDmn.User[];
};

export type CreateProjectParams = Pick<
  Project,
  'title' | 'description' | 'startDate' | 'endDate'
>;
export function createProject(params: CreateProjectParams) {
  const now = datetimeNow();
  const project = {
    ...params,
    createdAt: now,
    updatedAt: now,
  };

  return project as Project;
}

export type UpdateProjectParams = Pick<
  Project,
  'title' | 'description' | 'startDate' | 'endDate'
>;
export function updateProject(project: Project, params: UpdateProjectParams) {
  const now = datetimeNow();
  const updatedProject: Project = {
    ...project,
    title: params.title,
    description: params.description,
    startDate: params.startDate,
    endDate: params.endDate,
    updatedAt: now,
  };

  return updatedProject;
}
