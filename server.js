import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

let PORT = process.env.PORT || 4000
let MONGOURI = process.env.DB;

app.use('/', userRoutes);

mongoose.connect(MONGOURI ,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log('server started');
    })
})