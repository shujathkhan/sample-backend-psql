"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("babel-polyfill");

var _bankdetailscontroller = _interopRequireDefault(require("./src/usingDB/controllers/bankdetailscontroller"));

var _Users = _interopRequireDefault(require("./src/usingDB/controllers/Users"));

var _Auth = _interopRequireDefault(require("./src/usingDB/middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use(_express["default"].json());
app.get('/', function (req, res) {
  return res.status(200).send({
    'message': 'YAY! Congratulations! Your first endpoint is working'
  });
});
app.get('/api/v1/getbankdata/:ifsc/:limit/:offset', _bankdetailscontroller["default"].getBankDetail, _Auth["default"].verifyToken);
app.get('/api/v1/getbranchdata/:bankname/:city/:limit/:offset', _bankdetailscontroller["default"].getBranchDetail, _Auth["default"].verifyToken);
app.post('/api/v1/users', _Users["default"].create);
app.post('/api/v1/users/login', _Users["default"].login);
app["delete"]('/api/v1/users/me', _Auth["default"].verifyToken, _Users["default"]["delete"]);
app.listen(3000);
console.log('app running on port ', 3000);