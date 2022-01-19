const Express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');
const app = Express();
const PORT = 5000;
require('./database/Conectiondb').createconnection();

app.use(
    bodyParser.json({
    limit : '50mb'})
);

app.use(bodyParser.urlencoded({
    extended : true,
    limit : '50mb'})
);

app.use(Cors({}));

app.use('/api',require('./Controller/User/Route'))
app.use('/api/follow',require('./Controller/Follow/Route'))

app.listen(PORT,()=>{
    console.log("Port Running");
});