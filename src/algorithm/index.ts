import math from 'mathjs';
import { generatePoints } from './generatePoints';

declare module 'mathjs' {
  interface MathJsStatic {
    integral: (expr: string, variable: string, options?: any) => string;
    eval: (expr: string, scope?: any) => number;
  }
}

math.import(require('mathjs-simple-integral'));

export const CONFIG = {
  EPS: 0.05,
  N: 20,

  FUNCTION:
    '1/Math.sqrt(x) + Math.sqrt(x) + 1/2 * Math.pow(x, 3/2) + 1/6 * Math.pow(x, 5/2) + 1/24 * Math.pow(x, 7/2)',
  X_INTERVAL_START: 0,
  X_INTERVAL_END: 10,

  Y_DISPAY_START: -5,
  Y_DISPAY_END: 200,
};

function simpsonMethod(
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
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

function kantorovichMethod(
  funcString: string,
  a: number,
  b: number,
  eps: number,
  n: number
): number {
  const psi = (x: number) => {
    return (
      math.exp(x) -
      1 -
      x -
      Math.pow(x, 2) / 2 -
      Math.pow(x, 3) / 6 -
      Math.pow(x, 4) / 24
    );
  };

  let I1_integral = String(math.integral(funcString, 'x', { simplify: false }));

  let I1 = math.eval(I1_integral, { x: b }) - math.eval(I1_integral, { x: a });

  let I2 = simpsonMethod((x: number) => psi(x) / Math.sqrt(x), a, b, n);
  let I = I1 + I2;

  while (n < 1000) {
    n *= 2;
    let newI2 = simpsonMethod((x: number) => psi(x) / Math.sqrt(x), a, b, n);
    let newI = I1 + newI2;
    if (Math.abs(newI - I) < eps) {
      I = newI;
      break;
    }
  }

  return +I.toFixed(4);
}

const xAsisPoints = generatePoints(
  CONFIG.X_INTERVAL_START,
  CONFIG.X_INTERVAL_END,
  150
);

export const getChartData = () => ({
  xAxis: xAsisPoints,
  yAxis: xAsisPoints.map((x) =>
    kantorovichMethod(CONFIG.FUNCTION, 0, x, CONFIG.EPS, CONFIG.N)
  ),
});
