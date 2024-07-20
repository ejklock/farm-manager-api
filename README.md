# Farm Manager

## Overview

Farm manager is a web application built with NestJS, TypeORM, and PostgreSQL 15.2, running on Node.js 20.14

## Technologies

- **Docker**
- **Docker Compose**
- **TypeScript**
- **NestJS**
- **TypeORM**
- **PostgreSQL 15.2**
- **Node.js 20.14**

## Getting Started

To get started with the application, follow these steps:

### Prerequisites

Ensure you have Docker and Docker Compose installed on your machine.

### Accessing the Application

1. Open your browser and go to [https://farm-manager-api-ggrn.onrender.com](https://farm-manager-api-ggrn.onrender.com). You will find the Swagger documentation for the API.

### Running the Application

1. **Start the application**:

   ```bash
   docker-compose up --build
   ```

   This command will build and start the application along with its dependencies, including MySQL.

2. **Run the database migrations**:

   ```bash
   docker-compose exec app npm run typeorm:migration:run
   ```

   This command will execute all pending database migrations to set up the schema.

3. **Access the application**:

   Open your browser and go to [http://localhost:3333](http://localhost:3333). You will find the Swagger documentation for the API.

## API Usage

Use Swagger interface to manage farms,farmers, reports, farm cultures

Follow the steps below to use the API:

- Create Farmer
- Create Farm
- Create Farm Culture
- Generate Reports
