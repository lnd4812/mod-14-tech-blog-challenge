const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize= require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: "mystery spot",
    cookie: {maxAge: 1800000},
    resave: false, 
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        expiration: 15 * 60 * 1000  // set session to log out after 15 minutes of inactivity
    }),
};

app.use(session(sess));

const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.use(session(sess));

sequelize.sync({ force: false }).then(( ) => {
    app.listen(PORT,() => console.log('Now listening'));
});
