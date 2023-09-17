import { datetimeNow } from '@/lib/datetime';

export type UserProject = {
  id: UniqueId;
  projectId: UniqueId;
  userId: UniqueId;
  createdAt: Date;
};

export type CreateUserProjectParams = Pick<UserProject, 'projectId' | 'userId'>;
export function createUserProject(
  params: CreateUserProjectParams,
): UserProject {
  const now = datetimeNow();
  const userProject = {
    ...params,
    createdAt: now,
  };

  return userProject as UserProject;
}
