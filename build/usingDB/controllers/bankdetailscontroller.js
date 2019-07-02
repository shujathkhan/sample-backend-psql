"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var myData = {
  Status: null,
  RequestTime: null,
  MessageDetails: {
    code: null,
    Message: null
  },
  PayLoad: null
};
var bankdetails = {
  /*
  * Get A Bank detail
  * @param {object} req 
  * @param {object} res
  * @returns {object} bankbranch object
  */
  getBankDetail: function () {
    var _getBankDetail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var text, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req);
              text = 'SELECT * FROM bank_branches WHERE ifsc = $1 LIMIT $2 OFFSET $3';
              _context.prev = 2;
              _context.next = 5;
              return _db["default"].query(text, [req.params.ifsc, req.params.limit, req.params.offset]);

            case 5:
              _ref = _context.sent;
              rows = _ref.rows;
              console.log(req);

              if (rows[0]) {
                _context.next = 15;
                break;
              }

              myData.Status = "failure";
              myData.RequestTime = new Date();
              myData.MessageDetails.code = 0;
              myData.MessageDetails.Message = "Bank details not found";
              myData.PayLoad = [];
              return _context.abrupt("return", res.status(404).send(myData));

            case 15:
              myData.Status = "success";
              myData.MessageDetails.code = 1;
              myData.RequestTime = new Date();
              myData.MessageDetails.Message = "fetched";
              myData.PayLoad = rows;
              return _context.abrupt("return", res.status(200).send(myData));

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](2);
              myData.Status = "error";
              myData.RequestTime = new Date();
              myData.MessageDetails.code = -99;
              myData.MessageDetails.Message = JSON.stringify(_context.t0);
              myData.PayLoad = [];
              return _context.abrupt("return", res.status(400).send(myData));

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 23]]);
    }));

    function getBankDetail(_x, _x2) {
      return _getBankDetail.apply(this, arguments);
    }

    return getBankDetail;
  }(),
  getBranchDetail: function () {
    var _getBranchDetail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM bank_branches WHERE bank_name = $1 AND city = $2 LIMIT $3 OFFSET $4';
              _context2.prev = 1;
              _context2.next = 4;
              return _db["default"].query(text, [req.params.bankname, req.params.city, req.params.limit, req.params.offset]);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              console.log(text);

              if (rows[0]) {
                _context2.next = 14;
                break;
              }

              myData.Status = "failure";
              myData.MessageDetails.code = 0;
              myData.RequestTime = new Date();
              myData.MessageDetails.Message = "Bank details not found";
              myData.PayLoad = [];
              return _context2.abrupt("return", res.status(404).send(myData));

            case 14:
              myData.Status = "success";
              myData.RequestTime = new Date();
              myData.MessageDetails.code = 1;
              myData.MessageDetails.Message = "fetched";
              myData.PayLoad = rows;
              return _context2.abrupt("return", res.status(200).send(myData));

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](1);
              myData.Status = "error";
              myData.MessageDetails.code = -99;
              myData.RequestTime = new Date();
              myData.MessageDetails.Message = JSON.stringify(_context2.t0);
              myData.PayLoad = [];
              return _context2.abrupt("return", res.status(400).send(myData));

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 22]]);
    }));

    function getBranchDetail(_x3, _x4) {
      return _getBranchDetail.apply(this, arguments);
    }

    return getBranchDetail;
  }()
};
var _default = bankdetails;
exports["default"] = _default;
//# sourceMappingURL=bankdetailscontroller.js.map