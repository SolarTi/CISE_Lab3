/*
 * @Author: Tai Zhang
 * @Date: 2022-03-27 20:44:12
 * @LastEditTime: 2022-04-01 13:55:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Taicise_ass1a_worksheet3\server.js
 */
const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
// const books = require('./routes/api/books');

// const app = express();

// // Connect Database
// connectDB();

// // cors
// app.use(cors({ origin: true, credentials: true }));

// // Init Middleware
// app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Hello world!'));

// // use Routes
// app.use('/api/books', books);

// const port = process.env.PORT || 5000;

// mongoose
//     .connect(
//         "mongodb+srv://TaiZhang:Zhangtai1998@cluster0.kkx3g.mongodb.net/Cluster0?retryWrites=true&w=majority",
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }
//     )
//     .then(() => console.log("MongoDB has been connected"))
//     .catch((err) => console.log(err));

// require("dotenv").config()

// mongoose
//     .connect(
//         process.env.MONGODB_CONNECTION_STRING,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }
//     )
//     .then(() => console.log("MongoDB has been connected"))
//     .catch((err) => console.log(err));

// // Accessing the path module
// const path = require("path");

// // Step 1:
// app.use(express.static(path.resolve(__dirname, "./mern_a_to_z_client/build")));
// // Step 2:
// app.get("*", function (request, response) {
//     response.sendFile(path.resolve(__dirname, "./mern_a_to_z_client/build", "index.html"));
// });

// app.listen(port, () => console.log(`Server running on port ${port}`));

// app.js
require("dotenv").config({ path: './config.env' });

const express = require('express');
const connectDB = require('./config/db');
const path = require("path");
var cors = require('cors');

const books = require('./routes/api/book');
const app = express();
//connect database
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use('/api/books', books);

if (process.env.Status === "production") {
    app.use(express.static(path.join(__dirname, "/mern_a_to_z_client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'mern_a_to_z_client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send("API is working!");
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));