const express = require('express');
require('dotenv').config();
const userRoute = require('./routes/user.route');
const blogRoute = require('./routes/blog.route');
const commentRoute = require('./routes/comment.route');
const PORT = process.env.PORT || 3000
const cors = require('cors');

const mongoConnect = require('./connection')
mongoConnect
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log('Error in connecting mongoDB -', error))

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoute);
app.use('/api/blog', blogRoute)
app.use('/api/comment', commentRoute);

app.listen(PORT, () => {
    console.log('server listening at PORT ' + PORT);
})