#Blogging Platform:

This is a simple web application for creating and viewing blogs. Users can sign up, sign in, create new blogs, and view existing blogs. The application is built using Node.js, Express.js, MongoDB, and EJS.

Features:

User Authentication: Users can sign up with a full name, email, and password. They can also sign in with their email and password.
Create Blogs: Authenticated users can create new blogs by providing a title, body, and cover image.
View Blogs: Users can view existing blogs, including the title, body, cover image, and author information.
Add Comments: Users can add comments to existing blogs.

Setup:

Clone the Repository:
git clone <repository_url>

Install Dependencies:
npm install

Configure Environment Variables:
Create a .env file in the root directory.
Add the following environment variables:
makefile
Copy code
PORT=8000
MONGODB_URI=mongodb://localhost:27017/blogs
SECRET_KEY=<your_secret_key>

Run the Application:
npm start

Access the Application:
Open your web browser and go to http://localhost:8000 to access the application.

Dependencies:
Express: Web framework for Node.js
Mongoose: MongoDB object modeling for Node.js
EJS: Embedded JavaScript templates
Multer: Middleware for handling file uploads
Cookie-Parser: Middleware for parsing cookies

Project Structure:
/models: Contains Mongoose models for defining database schemas.
/routes: Contains route handlers for different endpoints.
/views: Contains EJS templates for rendering HTML pages.
/public: Contains static assets such as CSS files, images, and JavaScript files.
index.js: Entry point of the application.

Contributors
Ujjaval Mishra
