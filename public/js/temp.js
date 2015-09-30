'use strict';
var i = 0;
d3.csv('data/hist04z1_outlayByAgency1.csv', function(d) {
    for (let key in d) {
        if (key[0] === '1' || key[0] === '2') {
            d[key] = parseInt(d[key]) //string --> number
        }
    }
    return d; //transforms go here

}, function(err, data) {
    let tempObj = {};
    if (err) {
        return console.log('ERROR ', err)
    }
    console.log('Outlay By Agency', data);
    // data.forEach(record => {console.log})
});

// d3.csv('data/hist09z8_RnDByCategory.csv',function(d){
// 	return d; //transforms go here

// 	}, function(err,data){
// 	let tempObj = {};
// 	if(err){return console.log('ERROR ',err)}
// 	console.log('Rnd by category ',data);
// 	// data.forEach(record => {console.log})
// });