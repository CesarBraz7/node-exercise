import express from 'express'
import StudentRoute from './routes/StudentRoute.js'

const app = express();
const port = 5000;

app.use(express.json());
app.use(StudentRoute)

app.listen(port, () => {
    console.log("server started")
})