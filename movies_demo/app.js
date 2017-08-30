var express = require('express'),
	port = process.env.PORT || 3000,
	app = express(),
	path = require('path');
	
app.set('views','./views/pages')
app.set('view engine','jade')
app.use(express.bodyParser())//将表单数据格式化
app.use(express.static(path.join(__dirname,'bower_components')))//静态资源的获取
app.listen(port)

console.log(port)

app.get('/',function(req,res){
	res.render('index',{
		title:'电影 首页',
		movies:[{
			title:'机械战警',
			_id: 1,
			poster: 'C://Users//maobo//Desktop//nodejs//picture//logo.png' //'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}]
	})
});

app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'后台录入页'
	})
});

app.get('/movies/:id',function(req,res){
	res.render('detail',{
		title:'电影 详情页'
	})
});