import express from 'express';
import api from "./api";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', api);
app.listen(1337, () => console.log('server is running'))