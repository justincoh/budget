console.log('loaded')

d3.csv('../../data/hist04z1_outlayByAgency.xls',function(err,data){
	if(err){return console.log('ERROR ',err)}
	console.log(data)
});