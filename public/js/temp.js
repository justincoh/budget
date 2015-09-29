'use strict';
d3.csv('data/hist04z1_outlayByAgency1.csv',function(err,data){
	let tempObj = {};
	if(err){return console.log('ERROR ',err)}
	console.log(data)
	// data.forEach(record => {console.log})
});

d3.csv('data/hist09z8_RnDByCategory.csv',function(d){
	return {

	}

	}, function(err,rows){
	let tempObj = {};
	if(err){return console.log('ERROR ',err)}
	console.log('Rnd by category ',rows);
	// rows.forEach(record => {console.log})
});