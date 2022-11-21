const gradients = new Map<string, number>();
const key = (x: number, y: number): string => `${x},${y}`;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

const getGradient = (x: number, y: number): [number, number] => {
  const known = gradients.get(key(x, y));
  if (known) {
    return [Math.sin(known), Math.cos(known)];
  }
  const niu = Math.random();
  gradients.set(key(x, y), niu);
  return [Math.sin(niu), Math.cos(niu)];
};

const dotProduct = (x1, y1, x2, y2): number => {
  return x1 * x2 + y1 * y2;
};

const width = 300;
const height = 300;
const scale = 20;

canvas.width = width;
canvas.height = height;

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    const x = i / scale;
    const y = j / scale;

    const left = Math.floor(x);
    const right = left + 1;
    const top = Math.floor(y);
    const bottom = top + 1;

    const dx = x - left;
    const dy = y - top;

    const c1 = getGradient(top, left);
    const c2 = getGradient(top, right);
    const c3 = getGradient(bottom, left);
    const c4 = getGradient(bottom, right);

    const d1 = dotProduct(dx, dy, c1[0], c1[1]);
    const d2 = dotProduct(dx - 1, dy, c2[0], c2[1]);
    const d3 = dotProduct(dx, dy - 1, c3[0], c3[1]);
    const d4 = dotProduct(dx - 1, dy - 1, c4[0], c4[1]);

    const i1 = lerp(d1, d2, dx);
    const i2 = lerp(d3, d4, dx);
    const i3 = lerp(i1, i2, dy);

    // console.log({ i1, i2, i3 });

    const value = ((i3 + 1) * 255) / 2;
    ctx.fillStyle = `rgb(${value},${value},${value})`;
    ctx.fillRect(i, j, 1, 1);
    // break;
  }
  // break;
}
