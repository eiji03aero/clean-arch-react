import * as userDmn from '@/domain/User';
import * as pjDmn from '@/domain/Project';
import { datetimeNow } from '@/lib/datetime';

type TaskTitle = string;
type TaskDescription = string;
export type TaskStatus = 'not_started' | 'wip' | 'completed';

export type Task = {
  id: UniqueId;
  projectId: UniqueId;
  status: TaskStatus;
  title: TaskTitle;
  description: TaskDescription;
  createdAt: Date;
  updatedAt: Date;
  project?: pjDmn.Project;
  assignees?: userDmn.User[];
};

export type CreateTaskParams = Pick<
  Task,
  'projectId' | 'status' | 'title' | 'description'
>;
export function createTask(params: CreateTaskParams): Task {
  const now = datetimeNow();
  const task = {
    ...params,
    createdAt: now,
    updatedAt: now,
  };

  return task as Task;
}

export type UpdateTaskParams = Pick<
  Task,
  'projectId' | 'status' | 'title' | 'description'
>;
export function updateTask(task: Task, params: CreateTaskParams): Task {
  const now = datetimeNow();
  const updatedTask: Task = {
    ...task,
    projectId: params.projectId,
    status: params.status,
    title: params.title,
    description: params.description,
    updatedAt: now,
  };

  return updatedTask as Task;
}
