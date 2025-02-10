const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
 
const paymentRoutes = require('./routers/stripeRoutes'); 

const app = express();
const corsOptions = {
    origin: ['http://localhost:3000','https://cartinoadmin.pages.dev/','http://localhost:3001','http://localhost:5173', 'https://caretinojewels.com'], // Add allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (if needed)
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight requests for all routes
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log(err);
	});
 
app.use('/api/payment', paymentRoutes); 

app.get('/', (req, res) => {
	res.json({ message: 'server Running' });
});

app.listen(process.env.PORT, () => {
	console.log('listening...');
});