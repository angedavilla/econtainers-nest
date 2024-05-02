# econtainers-nest
Prueba Econtainers backend nest-mongo 
# NestJS with MongoDB

This project is a starter template for building NestJS applications with MongoDB as the database.

## Installation

1. Clone the repository:
   ```bash
   git clone 'https://github.com/angedavilla/econtainers-nest'

cd <project-folder>
## Npm
npm install
npm install --save @nestjs/mongoose mongoose bcrypt

## Configuration
MongoDB Setup:
Ensure you have MongoDB installed and running locally or specify the connection URI in the .env file.
Environment Variables:
Create a .env file at the root of the project and define the MongoDB connection URI. Example:
dotenv
Copy code
MONGODB_URI=mongodb://localhost:27017/nest_mongodb_crud_users

## AppModule Configuration
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_mongodb_crud_users'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


Development server
Run npm run start:dev or use npm run start for a development server. Navigate to http://localhost:3000/. The application will automatically reload if you change any of the source files.


Users API
GET /api/users
Description: Retrieves all users.
Response: Array of user objects.
GET /api/users/:id
Description: Retrieves a user by ID.
Parameters:
id: ID of the user.
Response: User object.
POST /api/users
Description: Creates a new user.
Request Body: User object.
Response: Created user object.
PUT /api/users/:id
Description: Updates a user by ID.
Parameters:
id: ID of the user.
Request Body: Updated user object.
Response: Updated user object.
DELETE /api/users/:id
Description: Deletes a user by ID.
Parameters:
id: ID of the user.
Response: Deleted user object.
