const express = require('express');
const app = express();
const port = 3000;

const taskRoutes = require('./routes/task.routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', taskRoutes);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;