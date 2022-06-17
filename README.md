<h1 align="center"> 
    Workroom Automation Internship Assignment
</h1>

<div align="center">
[![IMAGE ALT TEXT](http://img.youtube.com/vi/dwZ7s4MT8iI/0.jpg)](https://youtu.be/dwZ7s4MT8iI "Workroom Automation Intern Demo")
</div>

## Technology Stack

- ### Frontend
    - React
    - Bootstrap

- ### Backend
    - NodeJs

- ### Database
    - MongoDB
  
- ### Testing Unit
    - Jest

## Getting Started

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Gateways

- ## Create
  - Saves a new user to the database
  - Route: `/api/users/create`
  - Parametes:
    - First Name*
    - Last Name
    - Email* (key)
    - Age*
    - Profession*
    - Password* **(Hashed while saving)**
  - Returns:
    - `success` if user created successfully
    - `user already exists` if there is another user with same email address 
    - `Error Creating User` if the user creation fails

- ## Read
  - Returns all the users present in the database
  - Route: `api/users/showall`
  - Parameters:
    - none
  - Returns
    - All the users in JSON format
    - `No users found` if no users are present in the database
  
- ## Update
  - Updates the information about a user
  - Required `Password` to change the user information
  - Route: `api/users/updatedetails`
  - Parameters:
    - First Name*
    - Last Name
    - Email* (key)
    - Age*
    - Profession*
    - Password* **(Compared in hashed format)**
  - Returns
    - `success` if the user is updated
    - `User not found` if no user with given key exists
    - `Password does not match` if password validation fails
    - `Error updating user` for any other error
  
- ## Delete
  - Deletes the records for a user
  - Route: `api/users/delete`
  - Parameters:
    - Email (key)
  - Returns 
    - `success` if user deleted successfully
    - `User not found` if no user with given id exists
    - `Error deleting user` if any other error occurs
