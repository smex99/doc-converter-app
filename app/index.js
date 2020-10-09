const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const fileUpload = require('express-fileupload');
// const multer = require('multer');

const app = express();

// connect to local mongo db service
mongoose
	.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true })
	.then((_) => console.log('Connected Successfully to MongoDB'))
	.catch((err) => console.error(err));

/** Connect to mLab remote db service */
// mongoose.connect(config.db.mongodb.url, {useNewUrlParser: true});

/** Multer storage config  */
// const upload = multer({ dest: '../uploads/' });

// const storage = multer.diskStorage({
// 	destination: (req, file, callback) => {
// 		callback(null, 'uploads');
// 	},
// 	filename: (req, file, callback) => {
// 		callback(null, 'OCR_' + file.originalname);
// 	},
// });

// const upload = multer({ storage: storage });

// middleware
app.use(fileUpload({ debug: true, limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/attachment', require('./routes/attachments'));

// run the server on port 5000
app.listen(config.port);
console.log(`server started on port ${config.port}`);
