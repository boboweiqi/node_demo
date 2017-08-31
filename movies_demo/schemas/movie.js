var mongoose = require('mongoose')

var MovieSchema = new mongoose.Scheme({
    title:String,
    doctor:String,
    country:String,
    year:String,
    poster:String,
    flash:String,
    sunmmary:String,
    language:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

//pre方法，在是每条数据存储之前都会来调用这个方法
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Data.now();
    }else{
        this.meta.updateAt = Data.now();
    }
next()
})

MovieSchema.static = {
    fetch:function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .find({_id:id})
            .exec(cb)
    }
}

moudle.exports = MovieSchema