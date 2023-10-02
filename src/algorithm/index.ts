import math from 'mathjs';

math.import(require('mathjs-simple-integral'));

declare module 'mathjs' {
  interface MathJsStatic {
    integral: (expr: string, variable: string, options?: any) => string;
    eval: (expr: string, scope?: any) => number;
  }
}

const eps = 0.05;
let n = 20;

export const func = (x: number) => {
  return math.exp(x) / Math.sqrt(x);
};

function simpsonMethod(
  func: (x: number) => number,
  a: number,
  b: number
): number {
  const h = (b - a) / n;
  let limit_a = 0;
  let sum = limit_a + func(b);
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    if (i % 2 === 0) {
      sum += 2 * func(x);
    } else {
      sum += 4 * func(x);
    }
  }

  return (h / 3) * sum;
}

function methodKantorovich(
  func: (x: number) => number,
  a: number,
  b: number,
  eps: number
): number {
  let psi = (x: number) => {
    return (
      math.exp(x) -
      1 -
      x -
      Math.pow(x, 2) / 2 -
      Math.pow(x, 3) / 6 -
      Math.pow(x, 4) / 24
    );
  };

  let I1_integral = String(
    math.integral(
      '1/Math.sqrt(x)+ Math.sqrt(x)+ 1/2 * Math.pow(x, 3/2) + 1/6 * Math.pow(x, 5/2) + 1/24 * Math.pow(x, 7/2)',
      'x',
      { simplify: false }
    )
  );
  let I1 = math.eval(I1_integral, { x: b }) - math.eval(I1_integral, { x: a });

  let I2 = simpsonMethod((x: number) => psi(x) / Math.sqrt(x), a, b);
  let I = I1 + I2;
  while (n < 1000) {
    n *= 2;
    let newI2 = simpsonMethod((x: number) => psi(x) / Math.sqrt(x), a, b);
    let newI = I1 + newI2;
    if (Math.abs(newI - I) < eps) {
      I = newI;
      break;
    }
  }
  return I;
}

export const exports = {
  xAxis: [1, 2, 3],
  yAxis: [1, 2, 3].map((x) => methodKantorovich(func, 0, x, eps)),
};
