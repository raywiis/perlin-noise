const gradients = new Map<string, number>();
const key = (x: number, y: number): string => `${x},${y}`;

const getGradient = (x: number, y: number): [number, number] => {
  const known = gradients.get(key(x, y));
  if (known) {
    return [Math.sin(known), Math.cos(known)];
  }
  const niu = Math.random();
  gradients.set(key(x, y), niu);
  return [Math.sin(niu), Math.cos(niu)];
};
