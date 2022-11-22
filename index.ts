const gradients = new Map<string, number>();
const key = (x: number, y: number): string => `${x},${y}`;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function lerp(v0, v1, t) {
  // return (v1 - v0) * (3.0 - t * 2.0) * t * t + v0;
  return v0 * (1 - t) + v1 * t;
}

const scale = 100;
const getGradient = (x: number, y: number): [number, number] => {
  const known = gradients.get(key(x, y));
  if (known) {
    return [Math.sin(known), Math.cos(known)];
  }
  const niu = Math.random();
  gradients.set(key(x, y), niu);
  return [Math.sin(niu), Math.cos(niu)];
};

const dotProduct = (x1: number, y1: number, x2: number, y2: number): number => {
  return x1 * x2 + y1 * y2;
};

const width = 1000;
const height = 1000;

canvas.width = width;
canvas.height = height;

const fade = (x) => {
  return 3 * x * x - 2 * x * x * x;
};

const getVal = (x: number, y: number, x0: number, y0: number) => {
  const g = getGradient(x0, y0);
  const dx = x - x0;
  const dy = y - y0;
  const val = dotProduct(dx, dy, g[0], g[1]);
  return val;
};

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    const x = i / scale;
    const y = j / scale;

    const left = Math.floor(x);
    const right = left + 1;
    const bottom = Math.floor(y);
    const top = bottom + 1;

    const dx = x - left;
    const dy = y - bottom;

    const d1 = getVal(x, y, top, left);
    const d2 = getVal(x, y, top, right);
    const d3 = getVal(x, y, bottom, left);
    const d4 = getVal(x, y, bottom, right);

    // console.log({ d2, dx, dy, c20: c2[0], c21: c2[1] });
    // console.log({ d1, d2, d3, d4 });

    const i1 = lerp(d3, d4, dx);
    const i2 = lerp(d1, d2, dx);
    const i3 = lerp(i1, i2, dy);
    // console.log({ i1, i2, i3});

    const value = ((i3 + 1) / 2) * 255;
    ctx.fillStyle = `rgb(${value},${value},${value})`;
    ctx.fillRect(i, j, 1, 1);
    // break;
  }
  // break;
}
