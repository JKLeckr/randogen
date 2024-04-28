import { getSeed as getSetSeed } from './settings';

var seed: string = "0";
var state: number = 0;
var seeder: () => number;
var rand: () => number;
var init: boolean = false;

export function getSeed(): string { return seed; }
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

export function initSetup() {
  seed = getSetSeed();
  setup(false);
}
function setup(reset: boolean = true) {
  seeder = xmur3a(seed);
  rand = xoshiro128ss(seeder(), seeder(), seeder(), seeder());
  init = true;
}

function xmur3a(seed: string, usePreviousState: boolean = false): () => number {
  state = 2166136261 >>> 0;
  for (var k, i = 0; i < seed.length; i++) {
    k = Math.imul(seed.charCodeAt(i), 3432918353); k = k << 15 | k >>> 17;
    state ^= Math.imul(k, 461845907); state = state << 13 | state >>> 19;
    state = Math.imul(state, 5) + 3864292196 | 0;
  }
  state ^= seed.length;
  return function () {
    state ^= state >>> 16; state = Math.imul(state, 2246822507);
    state ^= state >>> 13; state = Math.imul(state, 3266489909);
    state ^= state >>> 16;
    return state >>> 0;
  }
}
function xoshiro128ss(a: number, b: number, c: number, d: number): () => number {
  return function () {
    var t = b << 9, r = b * 5; r = (r << 7 | r >>> 25) * 9;
    c = c ^ a; d = d ^ b; b = b ^ c; a = a ^ d; c = c ^ t;
    d = d << 11 | d >>> 21;
    return (r >>> 0) / 4294967296;
  }
}
