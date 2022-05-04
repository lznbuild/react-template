 const httpProxy = require('http-proxy');
 const path = require('path');
 const config = require('./config');
 const proxy = httpProxy.createProxyServer();

 function cleanCache(modulePath) {
     const module = require.cache[modulePath];
     if (module && module.parent) {
         module.parent.children.splice(module.parent.children.indexOf(module), 1);
     }
     delete require.cache[modulePath];
 };

 function proxyServer(config) {
   return (req, res) =>
     proxy.web(req, res, config, (err) => {
       console.log(err);
     });
 }

 function mockServer(req, res) {
   const folderPrefix = '../mock/';
   const filePath = path.join(__dirname, folderPrefix + req.path);
   const defaultPath = path.join(__dirname, folderPrefix + 'default');
   try {
     cleanCache(require.resolve(filePath));
   } catch (e) {
     console.log(e);
   }
   let mock;
   try {
     mock = require(filePath);
   } catch (e) {
     mock = require(defaultPath);
   }
   // 模拟下网络延迟状况
   setTimeout(() => {
     res.set('Content-Type', 'application/json');
     if (typeof mock === 'function') {
       mock(req, res);
     } else {
       res.end(JSON.stringify(mock));
     }
   }, 30);
   return;
 }

 module.exports = (req, res, next) => {
   if (req.path.includes('/rest') || req.path.includes('/api')) {
     const configPath = path.join(__dirname, './config.js');
     try {
       cleanCache(require.resolve(configPath));
     } catch (e) {
       console.log(e);
     }
     if (config.type === 'mock') {
       return mockServer(req, res);
     } else {
       return proxyServer(config.serverConfig)(req, res);
     }
   }
   else {
     next();
   }
 };
