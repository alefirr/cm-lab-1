import math from 'mathjs';
import { generatePoints } from './generatePoints';

math.import(require('mathjs-simple-integral'));

declare module 'mathjs' {
  interface MathJsStatic {
    integral: (expr: string, variable: string, options?: any) => string;
    eval: (expr: string, scope?: any) => number;
  }
}

const CONFIG = {
  EPS: 0.05,
  SIMPSON_N: 20,
  KANTOROVICH_N: 20,
  FUNCTION:
    '1/Math.sqrt(x) + Math.sqrt(x) + 1/2 * Math.pow(x, 3/2) + 1/6 * Math.pow(x, 5/2) + 1/24 * Math.pow(x, 7/2)',
};

function simpsonMethod(
  func: (x: number) => number,
  a: number,
  b: number
): number {
  const h = (b - a) / CONFIG.SIMPSON_N;
  let limit_a = 0;
  let sum = limit_a + func(b);
  for (let i = 1; i < CONFIG.SIMPSON_N; i++) {
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
  funcString: string,
  a: number,
  b: number,
  eps: number,
  n = 5
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

const xAsisPoints = generatePoints(0, 10, 100);

export const getChartData = () => ({
  xAxis: xAsisPoints,
  yAxis: xAsisPoints.map((x) =>
    methodKantorovich(CONFIG.FUNCTION, 0, x, CONFIG.EPS, CONFIG.KANTOROVICH_N)
  ),
});
