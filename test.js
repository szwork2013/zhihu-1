function function1() {
	console.log('function1');
	next();
}

function function2() {
	console.log('function2');
	return next();
	console.log('second function2')
}

function function3() {
	console.log('function3');
	return next();
	console.log('second function2')
}

var task = [function1,function2,function3];


function next(err,result){
	if (err) {
		console.log(err);
	}else{
		var currentTask = task.shift();
		if(currentTask){
			currentTask(result);
		}
	}
}

next();