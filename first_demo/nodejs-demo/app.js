/**
* 模块依赖
*/
var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, index = require('./routes/index')
, http = require('http')
,ejs = require('ejs')
, path = require('path')
,SessionStore = require('session-mongoose')(express);
var store = new SessionStore({
	url:'mongodb://localhost/session',
	interval:120000
});

var app = express();

//  环境变量
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');//app.set('view engine', 'ejs');
//  middleware
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//session
app.use(express.cookieParser());
app.use(express.cookieSession({secret : 'fens.me'}));
app.use(express.session({
secret : 'fens.me',
store: store,
cookie: { maxAge: 900000 }
}));
app.use(function(req, res, next){
res.locals.user = req.session.user;
next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// 这行代码将HelloExpress目录下的public目录作为静态文件交给static中间件来处理，对应的HTTP URI为'/'。path是一个Node.js模块，__dirname是Node.js的全局变量，指向当前运行的js脚本所在的目录。path.join()则用来拼接目录。
app.get('/',routes.index);
app.get('/login',routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
app.get('/home', routes.home);

// 开发模式
if ('development' == app.get('env')) {
app.use(express.errorHandler());
}

// 路径解析 路由配置
app.get('/', routes.index);
app.get('/users', user.list);

// 启动及端口
http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});