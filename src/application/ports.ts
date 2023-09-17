import * as userDmn from '@/domain/User';
import * as pjDmn from '@/domain/Project';

export interface AuthenticationService {
  login(id: UniqueId): Promise<userDmn.User>;
}

export interface UsersService {
  findAll(): Promise<userDmn.User[]>;
  findById(id: UniqueId): Promise<userDmn.User | undefined>;
}

export interface ProjectsService {
  findAll(): Promise<pjDmn.Project[]>;
  findById(id: UniqueId): Promise<pjDmn.Project | undefined>;
  create(params: pjDmn.CreateProjectParams): Promise<UniqueId>;
  update(project: pjDmn.Project): Promise<void>;
  remove(id: UniqueId): Promise<void>;
}

export interface UserProjectService {
  registerUsers(params: {
    projectId: number;
    assigneeIds: number[];
  }): Promise<void>;
}

export interface NavigationService {
  push(path: URLPath): void;
  getPath(): URLPath;
}

export interface SessionStorage {
  currentUser: userDmn.User | undefined;
  isLoggedIn: () => boolean;
  getSessionUserId: () => number | null;
  persistSession: (id: UniqueId) => void;
  revokeSession: () => void;
  setCurrentUser: (user: userDmn.User | undefined) => void;
}
