# Epilepsy Backend API

This is a Node.js + Express backend for managing patients with epilepsy. It provides endpoints to register users, fetch user profiles, and retrieve predefined categories.

## Project Structure

```
api-express/
├── app.js              # Main Express application
├── .env                # Environment variables (not committed)
├── data/               # Static JSON files
│   └── categories.json
├── config/nginx/       # Example Nginx configuration
│   └── default.conf
├── package.json
└── README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/NolanBeaujault/cortest-api.git
cd cortest-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file at the root of the project with the following content:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=epilepsie
DB_PORT=3306
```

### 4. Start the server

```bash
node app.js
```

The API will now be running on `http://localhost:2880`.

## Available Endpoints

* `POST /register` – Register a new user
* `GET /profil/:uid` – Get profile info of a user
* `GET /categories` – Get available categories (static JSON)

## Nginx Proxy Configuration

See `config/nginx/default.conf` for an example configuration that proxies requests to the API.

## Notes

* Ensure your MySQL database and table `utilisateurs` are properly created before starting the server. You can use the provided `.sql` file to create the `utilisateurs` table:

  ```bash
  mysql -u root -p < create_table_utilisateurs.sql
  ```

* Never commit your `.env` file or any sensitive credentials to the repository.

* You can find the detailed documentation of this application in the [Cortest Documentation Repository](https://github.com/NolanBeaujault/cortest-docs).
