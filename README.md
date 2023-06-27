
# URL Shortener & Search Optimisation

## Description
The URL Shortener and Search Optimization project is a web application built using Node.js, MongoDB, Express.js, and front-end technologies such as HTML, CSS, and Bootstrap. The project aims to provide a comprehensive solution for shortening long URLs, optimizing search functionality helping in performing searches and obtaining relevant results quickly and efficiently with implementing user authentication for enhanced security. 
The project utilizes Node.js which enables efficient handling of requests and responses, while Express.js simplifies the development of RESTful APIs and routes.MongoDB's flexible schema allows for easy storage and retrieval of information related to shortened URLs, user profiles.

### How to run the project?

You should have a good source code editor installed in your PC preferably VSCode. Then NodeJs package should be officialy installed and added to your PC environment variable path.
Similarly MongoDB/mongoose and Express packages have to be pre-installed in your path before compiling the project. 
Necessary Extensions and further required packages are also required to be installed. After installation of NodeJs and MongoDB from their official sources into the system path, load the Project in VS Code and run the following commands in the terminal-

- **npm i init**
-  After this, it will prompt you with a series of questions to gather information about your project name, version, description, entry point, author details, and other metadata which you can all accept and it will load the **package.json** file.

- **npm i express mongoose ejs**
- This will install the respective packages.

- **npm i --save-dev nodemon**
- This will install nodemon and save it as a development dependency in the project. The package will be downloaded from the npm registry and stored in the **"node_modules"** directory within the project's root folder.

- **npm run**
- (Ensure that MongoDB server is successfully running and connected most probably in the **localhost:27017** PORT, if it is giving errors and is getting disconnected, try manual approach -> Run **mongod** command in the terminal)
- **npm run test**
- **npm run devStart**
(Here devStart refers to the script nomenclature done in the package.json file which is **devStart** in my project)

- **Now you can open your poject in the browser with the PORT specified in the server.js file. In this case it is "localhost:5000"**

- **npm i shortid**
- "shortid" is a popular npm package used to generate unique and concise IDs which plays a vital role in the URL shortening process.

- **npm install method-override**
- It is a npm package commonly which allows us to override the HTTP request method using special query parameters. It configures with Express.js application as middleware.

- **NOTE**
 - *It is suggested to install MongoDB for VSCode, Quokka.js , NodeJS, ejs language support extensions in your VSCode for the smooth functioning*
- *If the mongoDB is already installed in the PC but the localhost of mongoDB is not connecting to the server and is giving an error, then try starting it manually by tpying "mongod" in the command prompt and keep it running, the connection will establish. If the error still persists, then check its installation again ensuring that all the packages and path variables are added.*

## Functionality

1. **Server Configuration:**

- The server.js file sets up an Express.js server by importing the necessary dependencies, such as Express, Mongoose, ShortUrl model, and method-override. It establishes a connection to a MongoDB database using Mongoose.

2. **Routing and Request Handling:**
- The server.js file defines several routes to handle different HTTP requests.
The root route ("/") is responsible for handling GET and POST requests.
GET request: Renders the index.ejs template with the list of shortUrls retrieved from the database, based on an optional search query.
POST request: Creates a new ShortUrl document in the database using the provided full URL and notes, and redirects back to the root ("/").
The route "/:shortUrl" handles GET requests for accessing the original URL associated with a given short URL.
The route "/shortUrls/:id" handles DELETE requests for removing a ShortUrl document from the database based on its ID.

3. **Database Operations:**
- The server.js file uses Mongoose to define and interact with a ShortUrl model, which represents the shortened URLs stored in the database.
The ShortUrl model is imported and used for various operations:
Creating a new document: The POST request handler creates a new ShortUrl document in the database with the provided full URL and notes.
Retrieving documents: The GET request handler retrieves shortUrls from the database based on an optional search query.
Updating click counts: When a short URL is accessed, the corresponding ShortUrl document is retrieved, its click count is incremented, and the document is saved.
Deleting a document: The DELETE request handler removes a ShortUrl document from the database based on its ID.

4. **Template Rendering:**
- The index.ejs file is an EJS (Embedded JavaScript) template used to render the HTML content that is sent to the client. The template contains HTML markup with dynamic sections indicated by <% %> tags, which are populated with data from the server.
- It displays a search form to search for existing shortened URLs and a form to create new shortened URLs.The existing shortened URLs are displayed in a table, showing the full URL, shortened URL, click count, notes, and a delete button. The template loops through the shortUrls data received from the server and dynamically generates table rows for each entry.

## Learning Takeaways

- Building a RESTful API: The project demonstrates how to create a RESTful API using Express.js, which handles various HTTP methods like GET, POST, and DELETE for different routes.

- Database Integration: The project showcases how to integrate MongoDB with Node.js using Mongoose. It covers establishing a connection, defining a data model (ShortUrl), performing CRUD operations (create, read, update, delete), and querying the database.

- Template Rendering with EJS: The project utilizes the EJS templating engine to dynamically generate HTML content on the server-side. It demonstrates how to pass data from the server to the template and render dynamic elements based on that data.

- Form Handling: The project illustrates how to handle form submissions using Express.js. It shows how to extract form data from requests, validate it, and process it accordingly (e.g., creating new ShortUrl documents).

- Front-End Development: The project includes an index.ejs file that demonstrates front-end development using HTML, CSS, and JavaScript. It showcases how to structure and style a web page, handle user interactions, and incorporate external libraries (Bootstrap, Font Awesome).

- Routing and Request Handling: The project exemplifies how to define routes in Express.js to handle different HTTP requests. It covers route parameters, query parameters, and request/response handling.

- Middleware Usage: The project utilizes middleware functions like express.urlencoded and methodOverride to enhance the functionality of the application. It showcases how middleware can be used to parse request bodies, override HTTP methods, and manipulate request/response objects.

- Error Handling: The project demonstrates basic error handling by catching and logging any errors that occur during database operations or request handling. It also includes a generic error response for internal server errors.

- Modular Code Structure: The project follows a modular code structure by separating the server configuration, routes, database operations, and template rendering into separate files. This promotes code organization, reusability, and maintainability.

- Web Development Best Practices: Throughout the project, several best practices are demonstrated, including data validation, code comments, proper error handling, separation of concerns, and using external libraries for enhanced functionality and styling.

## Resources


