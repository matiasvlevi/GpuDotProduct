const Matrix = require('./matrix.js');
const { GPU } = require('gpu.js');
const gpu = new GPU();

const a = new Matrix(3,3);
const b = new Matrix(1,3);

const multiplyMatrix = gpu.createKernel(function(a, b) {
    let sum = 0;
    for (let i = 0; i < 2048; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
}).setOutput([2048, 2048]);
let am = Matrix.make(2048,2048);

let bm =  Matrix.make(2048,2048);
a.set(am);
b.set(bm);


console.time('cpu');
c = Matrix.multiply(a,b);
console.timeEnd('cpu');

console.time('gpu');
gpuC = multiplyMatrix(am,bm);
console.timeEnd('gpu');
