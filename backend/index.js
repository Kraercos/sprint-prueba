const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
const cors = require('cors');

// Midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})

//Routes
app.use('/api/', require('./Routes/vehiculo'));
app.use('/api/', require('./Routes/linea'));
app.use('/api/', require('./Routes/marca'));
app.use('/api/', require('./Routes/consultUnica'));

// Monte de servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Server is running on port', app.get('port'));
});

