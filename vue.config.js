const url = 'https://www.apiopen.top/journalismApi'
const head = 'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html '
const extract  = 'http://ali-extract.showapi.com/extract'
const data = require('./vidoe.json');
const talk = require('./talk.json')
const list = talk['subjectList']
const vidoe = data['svidList']
module.exports ={
    configureWebpack:{
        devServer:{
            proxy:{
                '/api':{
                    target: 'https://www.apiopen.top/journalismApi',
                    pathRewrite: {"^/api": ""},
                    changeOrigin: true
                },
                '/head':{
                    target: 'http://c.m.163.com/nc',
                    pathRewrite: {"^/head": ""},
                    changeOrigin: true
                }
            },
            before(app){
                app.get('/myapi/vidoe' ,function(req, res){
                    res.json({data:vidoe, errno:0});
                });
                app.get('/mytalk/talk' ,function(req,res){
                    res.json({data:list,errno:0});
                })
            },
            port: 8081
        }
        
    }
}