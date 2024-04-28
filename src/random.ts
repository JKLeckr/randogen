var seed: string;
var state: () => number;
var rand: () => number;

export function getSeed(): string {return seed || "";}
export function setSeed(s: string) {
  seed = s;
  setup();
}

export function reset() {
  setup();
}

export function nextInt(max: number): number {
  return nextIntRange(0, max);
}
export function nextIntRange(min: number, max: number): number {
  var cmin = Math.ceil(min);
  var fmax = Math.floor(max);
  return Math.floor(rand() * (fmax - cmin) + cmin);
}

function setup() {
  state = xmur3a(seed);
  rand = xoshiro128ss(state(), state(), state(), state());
}

function xmur3a(seed: string): () => number {
  for(var k, i = 0, h = 2166136261 >>> 0; i < seed.length; i++) {
      k = Math.imul(seed.charCodeAt(i), 3432918353); k = k << 15 | k >>> 17;
      h ^= Math.imul(k, 461845907); h = h << 13 | h >>> 19;
      h = Math.imul(h, 5) + 3864292196 | 0;
  }
  h ^= seed.length;
  return function() {
      h ^= h >>> 16; h = Math.imul(h, 2246822507);
      h ^= h >>> 13; h = Math.imul(h, 3266489909);
      h ^= h >>> 16;
      return h >>> 0;
  }
}
function xoshiro128ss(a: number, b: number, c: number, d: number): () => number {
  return function() {
      var t = b << 9, r = b * 5; r = (r << 7 | r >>> 25) * 9;
      c = c ^ a; d = d ^ b; b = b ^ c; a = a ^ d; c = c ^ t;
      d = d << 11 | d >>> 21;
      return (r >>> 0) / 4294967296;
  }
}
