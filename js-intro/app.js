function makeAdder() {
    let currentSum = 0;
    return function (number) {
        if ((number !== undefined) && (typeof number === "number")) currentSum += number;
        return currentSum;
    }
}

let sum = makeAdder();

