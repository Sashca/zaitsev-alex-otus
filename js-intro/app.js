function SumAdder() {
    let currentSum = 0;
    function Adder(number) {
        if ((number !== undefined) && (typeof number === "number")) {
            currentSum += number;
            return Adder;
        } else {
            return currentSum;
        }
    }
    return Adder;
}

let sum = SumAdder();

console.log(sum(2)(2)(3)());
