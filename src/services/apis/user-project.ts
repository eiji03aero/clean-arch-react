import * as upDmn from '@/domain/UserProject';
import { Database } from '@/services/apis/db';

export async function registerUsers(params: {
  projectId: number;
  assigneeIds: number[];
}) {
  const db = new Database();

  const all = await db.userProject.toArray();
  const current = all.filter((up) => up.projectId === params.projectId);
  const currentUserIds = current.map((up) => up.userId);

  const deletedIds = currentUserIds.filter(
    (id) => !params.assigneeIds.includes(id),
  );
  const addedIds = params.assigneeIds.filter(
    (id) => !currentUserIds.includes(id),
  );

  const idsToDelete = current
    .filter((up) => {
      return deletedIds.includes(up.userId);
    })
    .map((up) => up.id);
  await db.userProject.bulkDelete(idsToDelete);

  const newUserProjects = addedIds.map((id) => {
    return upDmn.createUserProject({ projectId: params.projectId, userId: id });
  });
  await db.userProject.bulkAdd(newUserProjects);

  db.close();

  return;
}
