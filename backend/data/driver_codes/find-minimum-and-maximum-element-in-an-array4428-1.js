process.stdin.resume()
process.stdin.setEncoding("utf-8")

let inputString = ""
let currentLine = 0

process.stdin.on("data", i => {
    inputString += i
})

process.stdin.on("end", _ => {
    inputString = inputString.trim().split("\n").map(str => {
        return str.trim()
    })
    main()
})

function readLine() {
    return inputString[currentLine++]
}

function printList(res, n) {
    let s = ""
    for (let i = 0; i < n; i++) {
        s += res[i];
        s += " "

    }
    console.log(s);
}

function main() {
    let t = parseInt(readLine())
    let i = 0
    for (; i < t; i++) {
        let n = parseInt(readLine())
        let arr = new Array(n)
        let input_ar1 = readLine().split(" ").map(x => parseInt(x))
        for (let i = 0; i < n; i++) {
            arr[i] = input_ar1[i];

        }
        let obj = new Solution()
        let res = obj.getMinMax(arr, n)
        console.log(res[0] + " " + res[1]);

    }
}

class Solution {
    getMinMax(arr, n) {

    }
}

















































