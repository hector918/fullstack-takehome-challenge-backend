## Setting up Local Environment for Repository

1. **Clone the Repository**: Start by cloning this repository using the command:
   ```
   git clone <repository_url>
   ```
2. **Navigate to Local Repository**: Move into the local repository folder:
   ```
   cd <local_repository_folder>
   ```
3. **Install Dependencies**: Proceed to install the necessary dependencies by running:
   ```
   npm install
   ```

## Database Setup

1. **Import PostgreSQL Schema**: Utilize the PostgreSQL schema file located at `./db/schema.txt` to import the schema into your database.

2. **Optional: Seed Data Import**: If needed, import seed data from the `seed.txt` file.

## Configuration Setup

1. **Create Environment Variables File**: Generate a `.env` file in the local repository folder and set the following variables:

   ```plaintext
   DB_URL=postgres://**\*\***
   SALT=$2b$09$rJDS6/ihZOx7sCCRxjxKf.
   HTTPS_PORT=8000
   HTTP_PORT=8001
   ```

2. **Adjust Variables**: Customize the variables in the `.env` file according to your specific settings.

## Running the Server

Once the environment is configured, execute the following command to run the server:
`    node server.js
   `
