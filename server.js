const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/project-management-application'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/project-management-application/index.html'));});
app.listen(process.env.PORT || 8080);
