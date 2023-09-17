import Dexie, { Table } from 'dexie';

import * as userDmn from '@/domain/User';
import * as pjDmn from '@/domain/Project';
import * as upDmn from '@/domain/UserProject';
import * as taskDmn from '@/domain/Task';
import * as utDmn from '@/domain/UserTask';

const DBName = 'clean-arch-react-db';
const DBVersion = 1;

export class Database extends Dexie {
  public users!: Table<userDmn.User, number>;
  public projects!: Table<pjDmn.Project, number>;
  public userProject!: Table<upDmn.UserProject, number>;
  public tasks!: Table<taskDmn.Task, number>;
  public userTask!: Table<utDmn.UserTask, number>;

  public constructor() {
    super(DBName);
    this.version(DBVersion).stores({
      users: '++id,name,createdAt,updatedAt',
      projects: '++id,title,description,startDate,endDate,createdAt,updatedAt',
      userProject: '++id,projectId,userId,createdAt',
      tasks: '++id,projectId,status,title,description,createdAt,updatedAt',
      userTask: '++id,taskId,userId,createdAt',
    });
  }
}
