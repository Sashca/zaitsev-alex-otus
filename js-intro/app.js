function makeAdder() {
    let currentSum = 0;
    return function (number) {
        if (number !== undefined) currentSum += number;
        return currentSum;
    }
}

let sum = makeAdder();

