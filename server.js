import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import bankdetails from './src/usingDB/controllers/bankdetailscontroller';
import User from './src/usingDB/controllers/Users';
import Auth from './src/usingDB/middleware/Auth';
const app = express()

dotenv.config();


app.use(express.json())


app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})
app.get('/api/v1/getbankdata/:ifsc/:limit/:offset', Auth.verifyToken,bankdetails.getBankDetail);
app.get('/api/v1/getbranchdata/:bankname/:city/:limit/:offset',Auth.verifyToken, bankdetails.getBranchDetail);
app.post('/api/v1/users', User.create);
app.post('/api/v1/users/login',User.login);
app.delete('/api/v1/users/me', Auth.verifyToken, User.delete);
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
