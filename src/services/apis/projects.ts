import * as pjDmn from '@/domain/Project';
import { Database } from '@/services/apis/db';

export async function findAll() {
  const db = new Database();

  const projects = await db.projects.toArray();

  db.close();

  return projects;
}

export async function findById(id: UniqueId) {
  const db = new Database();

  const project = await db.projects.get(id);

  if (project) {
    const userProject = await db.userProject
      .filter((up) => up.projectId === project.id)
      .toArray();
    const userIds = userProject.map((up) => up.userId);

    const users = await db.users
      .filter((user) => userIds.includes(user.id))
      .toArray();
    project.assignees = users;
  }

  db.close();

  return project;
}

export async function create(project: pjDmn.Project) {
  const db = new Database();

  const id = await db.projects.add(project);

  db.close();

  return id;
}

export async function update(project: pjDmn.Project) {
  const db = new Database();

  await db.projects.put(project);

  db.close();

  return;
}

export async function remove(id: UniqueId) {
  const db = new Database();

  await db.projects.delete(id);

  db.close();

  return;
}
