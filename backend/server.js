const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rolesRouter = require('./routes/roles');
const catshopRouter = require('./routes/catshop');
const catsRouter = require('./routes/cats');
const ownersRouter = require('./routes/owners');
const sheltersRouter = require('./routes/shelters');
const staysRouter = require('./routes/stays');
const usersRouter = require('./routes/users');

const port = process.env.PORT || 5000; 

const app = express();
app.use(helmet());

let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

supertokens.init({
    supertokens: {
        connectionURI: "https://f5118131000e11ec82f83b2ed341776e-eu-west-1.aws.supertokens.io:3568",      
        apiKey: "HqXXKkxr5tBRqpovD9Zt4W8acjdilz"
    },
    appInfo: {
        appName: "felis",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000"
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: false,
}));

app.use(supertokens.middleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/client/build')))

  app.use('/roles', rolesRouter);
  app.use('/catshop', catshopRouter);
  app.use('/shelters', sheltersRouter);
  app.use('/cats', catsRouter);
  app.use('/owners', ownersRouter);
  app.use('/stays', staysRouter);
  app.use('/users', usersRouter);
  app.use(supertokens.errorHandler());
  
  app.listen(port, function(){
      console.log('Server started on port '+port);
  });