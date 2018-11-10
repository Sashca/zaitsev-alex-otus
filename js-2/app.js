var fn1  = () => {
    console.log("fn1");
    return Promise.resolve(1);
}

var fn2 = () => new Promise(resolve => {
    console.log("fn2");
    setTimeout(() => resolve(2), 1000);
})

var promiseReduce = function(asyncFunctions, reduce, initialValue) {
    return asyncFunctions.reduce(function (item, value) {
        return item.then(value).then((a) => {
            return reduce(initialValue, a);
        });
    }, Promise.resolve());
}

promiseReduce([fn1, fn2], function (memo, value) {
    console.log("reduce");
    return memo * value;
} , 1).then(console.log);