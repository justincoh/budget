var fs = require('fs');

fs.readFile('../js/temp.js',function(err,data){
	console.log('err',err)
	console.log('data',data.toString())
})