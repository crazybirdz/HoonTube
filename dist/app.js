"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _passport = _interopRequireDefault(require("passport"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _routes = _interopRequireDefault(require("./routes"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _middlewares = require("./middlewares");

require("./passport");

_dotenv.default.config();

var CookieStore = (0, _connectMongo.default)(_expressSession.default);
var app = (0, _express.default)();
app.use((0, _helmet.default)({
  contentSecurityPolicy: false
}));
app.use((0, _morgan.default)("dev"));
app.set("view engine", "pug");
app.set("views", _path.default.join(__dirname, "views"));
app.use("/dist", _express.default.static("dist"));
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use((0, _expressSession.default)({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({
    mongooseConnection: _mongoose.default.connection
  })
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
app.use(_middlewares.localsMiddlewares);
app.use(_routes.default.home, _globalRouter.default);
app.use(_routes.default.api, _apiRouter.default);
app.use(_routes.default.users, _userRouter.default);
app.use(_routes.default.videos, _videoRouter.default);
var _default = app;
exports.default = _default;