'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SECRET = 'myrandomkeytoencrypt';
var Auth = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  verifyToken: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decoded, text, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-access-token'];

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ 'message': 'Token is not provided' }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jsonwebtoken2.default.verify(token, SECRET);

            case 6:
              decoded = _context.sent;

              // console.log(decoded)
              text = 'SELECT * FROM users WHERE id = $1';
              _context.next = 10;
              return _db2.default.query(text, [decoded.userId]);

            case 10:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ 'message': 'The token you provided is invalid' }));

            case 14:
              req.user = { id: decoded.userId };
              next();
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](3);
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 18]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return verifyToken;
  }()
};

exports.default = Auth;
//# sourceMappingURL=Auth.js.map