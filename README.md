````markdown
# PVL Assessment Demo

As part of the PVL hiring assessment, I've developed this MERN stack application, showcasing my skills in building a full-stack web application using the MERN (MongoDB, Express, React, Node.js) stack. It has been a valuable learning experience, and I'm excited to present my work.

## Getting Started

To run this project locally for development and testing, follow these steps:

### Prerequisites

Make sure your computer has the following software installed:

- [Node.js](https://nodejs.org/): JavaScript runtime environment
- [npm](https://www.npmjs.com/): Node Package Manager

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/PVL_Assessment_Demo.git
   ```
````

2. Navigate to the project's root folder:

   ```bash
   cd PVL_Assessment_Demo
   ```

3. Install the server dependencies:

   ```bash
   npm install
   ```

4. Navigate to the client folder:

   ```bash
   cd client
   ```

5. Install the client dependencies:

   ```bash
   npm install
   ```

### Configuration

Before running the application, you need to configure your MongoDB connection settings as I have not allowed external IP's for database acsess.
For the sake of the assessment, I will keep the port open as I do not know the IP that will be accessing the DB. It is not recommended usually as it is a major security concern.

### Running the Application

1. Start the backend server from the project's root folder:

   ```bash
   node app.js
   ```

2. Run the frontend development server from inside the client folder:

   ```bash
   cd client
   npm start
   ```

You can access the application at [http://localhost:3000/](http://localhost:3000/).

## Project Structure

- The backend code is located in the root folder and is built with Express.js. It connects to a MongoDB database hosted on MongoDB Atlas.
- The frontend code resides in the client folder and is developed using React.

## Deployment

This project is ready for deployment on cloud platforms or web hosting services. Don't forget to update your MongoDB connection string for the production environment.

## Running Tests

To run test cases for the Node.js application using Mocha, follow these steps:

1. Open a terminal.

2. Navigate to the root folder of your project using the `cd` command:

   ```bash
   cd /path/to/your/project
   ```

3. Run the Mocha tests using the following command:

   ```bash
   .\node_modules\.bin\mocha .\test\app.test.js
   ```

   This command runs the Mocha tests located in the `app.test.js` file within the `test` folder of the project.

4. You can modify the `formData` object in the `app.test.js` file to test different data scenarios. Update the data as needed for your test cases.

Testing is essential for ensuring the reliability of your code.

## Built With

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas): Cloud-hosted MongoDB database
- [Express.js](https://expressjs.com/): Web application framework for Node.js
- [React](https://reactjs.org/): JavaScript library for building user interfaces
- [Node.js](https://nodejs.org/): JavaScript runtime environment

## Acknowledgments

I would like to express my gratitude to [PVL] for offering me this assessment opportunity.

```

```

```

```
