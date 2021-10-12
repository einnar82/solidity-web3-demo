import express from 'express'
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import coinRoute from './routes/coin.route'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(helmet());
app.use(cors());

app.use('/coins', coinRoute);
app.get('/', (req, res) => {
    res.json({
        message: 'ok'
    })
})

app.use((req, res, next) => {
    return res.status(404).json({
        error: 'Not found'
    })
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: err
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});