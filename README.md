# Clean Arch React
Sample project to implement clean architecture in react.
Idea is based on: https://dev.to/bespoyasov/clean-architecture-on-frontend-4311

# Todo
- [ ] document the motivation to adopt this architecture
    - testability? should try to write test as well.
- [ ] Implement Projects page
- [x] Implement login feature
    - Dashboard page 
    - Login feature
    - currentUser mechanism
    - show current user in dashboard
    - load current user from sessionstorage
    - logout
    - redirect to login page if not logged in
- [x] Write document about the pages

# Document
## Pages
### Dashboard page
- Show account info
- Show my tasks

### Login page
- Login with the existing account
    - Just select from existing account

### Projects page
- List out all the existing projects
- Create new project
- Delete project
- Show / update project

### Tasks page
- List out all the existing tasks
- Can filter out
    - assignee
    - project
- Create new task
- Delete task
- Show / update task
    - Can do message thread

## Models
- Project
    - id: number;
    - title: string;
    - description: string;
    - start_date: Date;
    - end_date: Date;
    - use_task_progress: boolean;
    - created_at: Date;
    - updated_at: Date;
    - assignees: User[];
- Task
    - id: number;
    - project_id: number;
    - title: string;
    - description: string;
    - created_at: Date;
    - updated_at: Date;
    - progress?: number;
    - assignees: User[];
- User
    - id: number;
    - name: string;
    - created_at: Date;
    - updated_at: Date;
