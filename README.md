# Task Manager API

A simple RESTful API for managing tasks, built with Node.js and Express. This project uses a `task.json` file as an in-memory database, making it easy to run without any database configuration.

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later)

### Installation & Running

1.  **Clone, install dependencies, and start the server:**
    ```sh
    # Clone the repository
    git clone [https://github.com/your-username/task-manager-api.git](https://github.com/your-username/task-manager-api.git)

    # Navigate to the project directory
    cd task-manager-api

    # Install the required packages
    npm install

    # Start the server
    node app.js
    ```

2.  The server will be running at `http://localhost:3000`. You should see the message `Server is listening on port 3000` in your terminal.

## API Endpoints

The base URL for all endpoints is `http://localhost:3000/api`.

| Method | Endpoint         | Description                         | Request Body (JSON) Example                               |
| :----- | :--------------- | :---------------------------------- | :-------------------------------------------------------- |
| `GET`  | `/tasks`         | Retrieve all tasks.                 | (None)                                                    |
| `GET`  | `/tasks/:id`     | Retrieve a single task by its ID.   | (None)                                                    |
| `POST` | `/tasks`         | Create a new task.                  | `{"title": "New Task", "description": "Details"}`         |
| `PUT`  | `/tasks/:id`     | Update an existing task by its ID.  | `{"title": "Updated Title", "completed": true}`           |
| `DELETE`| `/tasks/:id`    | Delete a task by its ID.            | (None)                                                    |

### Example Usage with cURL

* **Get all tasks:**
    ```sh
    curl http://localhost:3000/api/tasks
    ```

* **Create a new task:**
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"title":"My First Task","description":"Finish this project"}' http://localhost:3000/api/tasks
    ```