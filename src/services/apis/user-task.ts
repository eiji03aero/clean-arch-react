import * as utDmn from '@/domain/UserTask';
import { Database } from '@/services/apis/db';

export async function registerUsers(params: {
  taskId: number;
  assigneeIds: number[];
}) {
  const db = new Database();

  const all = await db.userTask.toArray();
  const current = all.filter((ut) => ut.taskId === params.taskId);
  const currentUserIds = current.map((ut) => ut.userId);

  const deletedIds = currentUserIds.filter(
    (id) => !params.assigneeIds.includes(id),
  );
  const addedIds = params.assigneeIds.filter(
    (id) => !currentUserIds.includes(id),
  );

  const idsToDelete = current
    .filter((ut) => {
      return deletedIds.includes(ut.userId);
    })
    .map((ut) => ut.id);
  await db.userTask.bulkDelete(idsToDelete);

  const newUserTasks = addedIds.map((id) => {
    return utDmn.createUserTask({ taskId: params.taskId, userId: id });
  });
  await db.userTask.bulkAdd(newUserTasks);

  db.close();

  return;
}
