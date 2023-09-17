# Clean Arch React
Sample project to implement clean architecture in react.
Idea is based on: https://dev.to/bespoyasov/clean-architecture-on-frontend-4311

# Todo
- [ ] Implement task thread feature
- [ ] document the motivation to adopt this architecture
    - testability? should try to write test as well.
- [x] Implement Tasks page
    - show tasks in list table
    - create task
    - edit task
    - delete task
- [x] Implement Projects page
    - show projects in list table
    - create project
        - basic
        - assign user to project
    - edit project
    - delete project
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
    - created_at: Date;
    - updated_at: Date;
    - assignees: User[];
- Task
    - id: number;
    - project_id: number;
    - title: string;
    - description: string;
    - status: string;
    - created_at: Date;
    - updated_at: Date;
    - assignees: User[];
- User
    - id: number;
    - name: string;
    - created_at: Date;
    - updated_at: Date;
