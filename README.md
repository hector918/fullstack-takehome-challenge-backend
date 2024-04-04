## Setting up Local Environment for Repository

1. **Clone the Repository**: Begin by cloning this repository using the command:
   ```
   git clone <repository_url>
   ```
2. **Navigate to Local Repository**: Move into the local repository folder:
   ```
   cd <local_repository_folder>
   ```
3. **Install Dependencies**: Execute the following command to install the necessary dependencies using npm:
   ```
   npm install
   ```

## Configuration Setup

1. **Create Environment Variables File**: Generate a `.env` file in the local repository folder and populate it with the following variables:

   ```plaintext
   DB_URL=postgres://**\*\***
   SALT=$2b$09$rJDS6/ihZOx7sCCRxjxKf.
   HTTPS_PORT=8000
   HTTP_PORT=8001
   ```

2. **Adjust Variables**: Customize the variables in the `.env` file according to your specific settings.

## Running the Server

After configuring the environment variables, execute the following command to run the server:
`    node server.js
   `
