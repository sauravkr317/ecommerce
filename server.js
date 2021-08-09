import express from 'express';
import { DB_URL, SESSION_SECRET } from './app/config';
import './app/db';
import ejs from 'ejs';
import path from 'path';
import initRoute from './routes/web';
import router from './routes/api';
import { errorHandler } from './app/http/controller';
import expressLayout from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoDbStore from 'connect-mongo';
import flash from 'express-flash';
import passport from 'passport';
import init from './app/passport';

const app = express();

// store session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: DB_URL,
        collection: 'Sessions'
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// passport logic
init(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
   res.locals.session = req.session;
   res.locals.user = req.user;
   next();
})

app.use(flash());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLayout);

global.rootDir = path.resolve(__dirname);

app.use(cookieParser());
app.use(router);
initRoute(app);

app.use('/Uploads', express.static('Uploads'));
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App is running on ${process.env.PORT}`)
});