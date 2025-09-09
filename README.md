Church App Backend
Project Description
This is the backend for the Church Application. It is a RESTful API built with Node.js and Express, designed to manage all server-side logic, user authentication, and data persistence. It uses a PostgreSQL database for data storage and Drizzle ORM for a type-safe database experience.

Technologies Used
Node.js: The JavaScript runtime for the server.

Express: A web framework for handling API routes.

TypeScript: For robust and scalable code.

Drizzle ORM: A modern and lightweight ORM for database interactions.

PostgreSQL: The database used for the application.

bcrypt: For secure password hashing.

jsonwebtoken: For handling user authentication with JWTs.

Swagger: For API documentation and testing.

Getting Started
Installation
Navigate into this directory from your terminal:

cd churchAppBackend

Install all project dependencies:

pnpm install

Environment Variables
Create a .env file in the root of this directory and add your database connection string and other environment variables.

DATABASE_URL="your_postgresql_database_connection_string"

Database Management
This project uses Drizzle for database migrations. Here are the most common commands:

Generate Migrations: After making changes to your schema, run this command to generate a new migration file.

pnpm gen

Run Migrations: Apply all pending migrations to your database.

pnpm migrate

Seed the Database: Populate your database with initial data (e.g., test users, default values).

pnpm seed

Running the Server
Development Mode: This command uses ts-node-dev to watch for changes and automatically restart the server.

pnpm dev

Production Mode: This command compiles the TypeScript code and runs the server from the compiled JavaScript files.

pnpm start

API Endpoints
API documentation is available through Swagger. Once the server is running, you can access the interactive documentation at:

http://localhost:3000/docs

License
This project is licensed under the ISC License.