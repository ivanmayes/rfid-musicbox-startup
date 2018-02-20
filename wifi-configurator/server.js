import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger'
import morgan from 'morgan'
import config from './core/config/config.dev'
import wifi from './routes/wifi.route'
import path from 'path'
import sass from 'node-sass-middleware'

const port = config.serverPort;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true
}));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));



app.use('/wifi', wifi);

//Index route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

app.use((req, res) => {
    res.status(301).render('index', {
        title: 'Home'
    });
});

app.listen(port, () => {
    logger.info('server started - ', port);
});
