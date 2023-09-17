import { datetimeNow } from '@/lib/datetime';

export type UserTask = {
  id: UniqueId;
  taskId: UniqueId;
  userId: UniqueId;
  createdAt: Date;
};

export type CreateUserTaskParams = Pick<UserTask, 'taskId' | 'userId'>;
export function createUserTask(params: CreateUserTaskParams): UserTask {
  const now = datetimeNow();
  const userTask = {
    ...params,
    createdAt: now,
  };

  return userTask as UserTask;
}
