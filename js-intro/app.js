function sumAdder() {
    let currentSum = 0;
    function adder(number) {
        if ((number !== undefined) && (typeof number === "number")) {
            currentSum += number;
            return adder;
        } else {
            return currentSum;
        }
    }
    return adder;
}

let sum = sumAdder();

console.log(sum(2)(2)(3)());
