npm install -g express-generator@3//@加参数 在express4.x版本之后
express -V

使用express命令创建工程，并支持ejs
express -e nodejs-demo

根据提示，下载依赖包
cd nodejs-demo && npm install

npm install supervisor


目录介绍：

    node_modules, 存放所有的项目依赖库。(每个项目管理自己的依赖，与Maven,Gradle等不同)
    package.json，项目依赖配置及开发者信息
    app.js，程序启动文件
    public，静态文件(css,js,img)
    routes，路由文件(MVC中的C,controller)
    Views，页面文件(Ejs模板)
