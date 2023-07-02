const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. 
Server is running on port 3000`
      );
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
