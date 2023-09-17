import * as taskDmn from '@/domain/Task';
import { Database } from '@/services/apis/db';

export async function findAll() {
  const db = new Database();

  const tasks = await db.tasks.toArray();

  for (const task of tasks) {
    const project = await db.projects.get(task.projectId);
    task.project = project;
  }

  db.close();

  return tasks;
}

export async function findById(id: UniqueId) {
  const db = new Database();

  const task = await db.tasks.get(id);

  if (task) {
    const userTask = await db.userTask
      .filter((ut) => ut.taskId === task.id)
      .toArray();
    const userIds = userTask.map((ut) => ut.userId);

    const users = await db.users
      .filter((user) => userIds.includes(user.id))
      .toArray();
    task.assignees = users;
  }

  db.close();

  return task;
}

export async function create(task: taskDmn.Task) {
  const db = new Database();

  const id = await db.tasks.add(task);

  db.close();

  return id;
}

export async function update(task: taskDmn.Task) {
  const db = new Database();

  await db.tasks.put(task);

  db.close();

  return;
}

export async function remove(id: UniqueId) {
  const db = new Database();

  await db.tasks.delete(id);

  db.close();

  return;
}
