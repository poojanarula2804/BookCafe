# BookCafe
BookCafe is a one-stop solution to all the book readers and authors. It's a full stack Web Application that has been built using HTML, CSS, JavaScript for the frontend and Node.js for the backend. The database used to store the data is MongoDB. Cloudinary has been used for image management pipeline. For the authentication, Passport.js has been used. Dive deep into the world of books...

## Link
The web application has been deployed using Heroku. Check it out- https://fathomless-depths-75818.herokuapp.com/

## Features
- Read the description, genre, price, pictures, author and reviews for all the books.
- Add your own book for others to read and review.
- Leave star ratings and reviews for the books.
- User authentication via register/login options.
- User authorisation so that only the owner of each book or review can edit or delete it.

## Getting started
1. Install mongodb
2. Create a cloudinary account to get an API key and secret code
3. Clone repository and install dependencies
```
git clone https://github.com/poojanarula2804/BookCafe
cd BookCafe
npm install
```
4. Create a .env file (or just export manually in the terminal) in the root of the project and add the following:
```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```
5. Run mongod in another terminal and node app.js in the terminal with the project.
6. Go to localhost:3000.
