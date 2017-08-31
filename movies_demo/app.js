var express = require('express'),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	_ = require('underscore'),
	Movie = require('./models/movie'),
	app = express(),
	path = require('path');

mongoose.connect('mongodb://localhost/movie')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(express.bodyParser())//将表单数据格式化
app.use(express.static(path.join(__dirname,'bower_components')))//静态资源的获取
app.listen(port)

console.log(port)

app.get('/',function(req,res){
	Movie.fetch(function (err,movies) {
		if(err){
			console.log(err)
		}
    })
	res.render('index',{
		title:'电影 首页',
		movies:movies
	})
});

app.get('/admin/movies',function(req,res){
	res.render('admin',{
		title:'后台录入页',
		movies:[{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			sunmmary:'',
			language:''
		}]
	})
});

//admin update movie
app.get('/admin/update/:id',function (req,res){
	var id = req.params.id
	if(id){
		Movie.findById(id,function (err,movie) {
		res.render('admin',{
			title:'电影后台更新页',
			movies:movie
		})
        })
	}
})
//admin post movie
app.post('/admin/movie/new',function (req,res) {
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie
	if(id!='undefined'){
		Movie.findById(id,function (err,movie) {
			if(err){
				console.log(err)
			}
			_movie = _.extend(movie,movieObj)
			_movie.save(function (err,movie) {
				if(err){
					console.log(err)
				}
				res.redirect('/movie/'+movie._id)
            })
        })
	}else{
		_movie = new Movie({
			doctor: movieObj.doctor,
            title: movieObj.title,
           country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
           summary: movieObj.summary,
			flash:movieObj.flash

		})
        _movie.save(function (err,movie) {
            if(err){
                console.log(err)
            }
            res.redirect('/movie/'+movie._id)
        })
	}
    })


app.get('/admin/list',function(req,res){
    Movie.fetch(function (err,movies) {
        if(err){
            console.log(err)
        }
    })
    res.render('index',{
        title:'电影 首页',
        movies:movies
    })
});

app.get('/movies/:id',function(req,res){
	var id = req.param.id

	Movie.findById(id,function (err,movie) {
        res.render('detail',{
            title:'电影 详情页' + movie.title,
            movies:movie
        })
    })

});