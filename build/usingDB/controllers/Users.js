'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _Helper = require('./Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, createQuery, values, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ 'message': 'Some values are missing' }));

            case 2:
              if (_Helper2.default.isValidEmail(req.body.email)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ 'message': 'Please enter a valid email address' }));

            case 4:
              hashPassword = _Helper2.default.hashPassword(req.body.password);
              createQuery = 'INSERT INTO\n        users(id, email, password, created_date, modified_date)\n        VALUES($1, $2, $3, $4, $5)\n        returning *';
              values = [(0, _v2.default)(), req.body.email, hashPassword, (0, _moment2.default)(new Date()), (0, _moment2.default)(new Date())];
              _context.prev = 7;
              _context.next = 10;
              return _db2.default.query(createQuery, values);

            case 10:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              token = _Helper2.default.generateToken(rows[0].id);

              console.log(token);
              return _context.abrupt('return', res.status(201).send({ token: token }));

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](7);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 21;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ 'message': 'User with that EMAIL already exist' }));

            case 21:
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[7, 17]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),

  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  login: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref4, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ 'message': 'Some values are missing' }));

            case 2:
              if (_Helper2.default.isValidEmail(req.body.email)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ 'message': 'Please enter a valid email address' }));

            case 4:
              text = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 5;
              _context2.next = 8;
              return _db2.default.query(text, [req.body.email]);

            case 8:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ 'message': 'The credentials you provided is incorrect' }));

            case 12:
              if (_Helper2.default.comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ 'message': 'The credentials you provided is incorrect' }));

            case 14:
              token = _Helper2.default.generateToken(rows[0].id);

              console.log(token);
              return _context2.abrupt('return', res.status(200).send({ token: token }));

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2['catch'](5);
              return _context2.abrupt('return', res.status(400).send(_context2.t0));

            case 22:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[5, 19]]);
    }));

    function login(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }(),

  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  delete: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var deleteQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
              _context3.prev = 1;
              _context3.next = 4;
              return _db2.default.query(deleteQuery, [req.user.id]);

            case 4:
              _ref6 = _context3.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt('return', res.status(404).send({ 'message': 'user not found' }));

            case 8:
              return _context3.abrupt('return', res.status(204).send({ 'message': 'deleted' }));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3['catch'](1);
              return _context3.abrupt('return', res.status(400).send(_context3.t0));

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 11]]);
    }));

    function _delete(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return _delete;
  }()
};

exports.default = User;
//# sourceMappingURL=Users.js.map