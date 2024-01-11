const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client' folder
app.use(express.static(path.join(__dirname, 'client')));

// Your route definitions go here
require('./server/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));


// const express = require('express');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static('../client/dist'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// require('./server/routes/htmlRoutes')(app);

// app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
