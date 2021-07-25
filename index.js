import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/////////Added from suggestion
var express = require('express');
var server = express();
var options = {
index: 'index.html'
};
server.use('/', express.static('/home/site/wwwroot', options));
server.listen(process.env.PORT);
/////////

ReactDOM.render(<App />, document.getElementById('root'));