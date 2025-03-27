# Nest Task Manager

A task management API built with [NestJS](https://nestjs.com/), PostgreSQL, TypeORM, and JWT Authentication. This project demonstrates best practices in backend development with modern technologies.

## Features

- **User Authentication**: Secure login and signup with JWT tokens.
- **Task Management**: Create, read, update, and delete tasks.
- **Authorization**: Restrict access to tasks based on user roles.
- **Database Integration**: PostgreSQL with TypeORM.
- **Validation & Error Handling**: Ensuring data integrity and proper responses.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional, for database setup)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ahmedsiddique01/nest-task-manager.git
   cd nest-task-manager
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```

## Database Setup

You can run PostgreSQL using Docker:
```sh
docker run --name postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
```

Create a database (e.g., `task_manager`).

## Environment Variables

Create a `.env` file in the root directory:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=task_manager
JWT_SECRET=your_jwt_secret
```

## Running the Application

Start the application in development mode:
```sh
yarn start:dev
```

For production:
```sh
yarn start:prod
```

## API Endpoints

- `POST /auth/signup` - User signup
- `POST /auth/signin` - User login
- `POST /tasks` - Create a task
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a task by ID
- `PATCH /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete a task


## Deployment

To deploy on Heroku:
1. Create a Heroku app.
2. Push your code.
3. Configure PostgreSQL and environment variables.
4. Deploy and access via Heroku URL.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For questions, contact [ahmedsiddique01](https://github.com/ahmedsiddique01).

