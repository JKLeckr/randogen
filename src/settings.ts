import { Preferences } from "@capacitor/preferences";

var init: boolean = false;

var randomSeed: boolean = false;
var seed: string = "0";
var rangeMin: number = 0;
var rangeMax: number = 9999;

const loadRandomSeed = async () => {
  randomSeed = Boolean((await Preferences.get({key: "randomSeed"})).value) || false;
}
const saveRandomSeed = async () => {
  await Preferences.set({
    key: "randomSeed",
    value: String(randomSeed),
  });
}
const loadSeed = async () => {
  var setSeed = (await Preferences.get({key: "seed"})).value || "0";
  if (randomSeed || setSeed==null) {
    setSeed = String(Math.random());
  }
  seed = setSeed;
};
const saveSeed = async () => {
  await Preferences.set({
    key: "seed",
    value: seed,
  });
}
const loadRangeMin = async () => {
  let rmin = Number((await Preferences.get({key: "rangeMin"})).value) || 0;
  rangeMin = Math.min(rmin, rangeMax);
}
const saveRangeMin = async () => {
  await Preferences.set({
    key: "rangeMin",
    value: String(Math.min(rangeMin, rangeMax)),
  });
}
const loadRangeMax = async () => {
  let rmax = Number((await Preferences.get({key: "rangeMax"})).value) || 9999;
  rangeMax = Math.max(rmax, rangeMin);
}
const saveRangeMax = async () => {
  await Preferences.set({
    key: "rangeMax",
    value: String(Math.max(rangeMin, rangeMax)),
  });
}
const loadSettings = async () => {
  await loadRandomSeed();
  await loadSeed();
  await loadRangeMin();
  await loadRangeMax();
  console.log("Loaded settings.");
};
export const saveSettings = async () => {
  await saveRandomSeed();
  await saveSeed();
  await saveRangeMin();
  await saveRangeMax();
  console.log("Saved settings.");
}

export function getSeed() { return seed; }
export function getRandomSeed() { return randomSeed; }
export function getRangeMin() { return rangeMin; }
export function getRangeMax() { return rangeMax; }
export function getSettings() {
  return {
    seed: getSeed(),
    randomSeed: getRandomSeed(),
    rangeMin: getRangeMin(),
    rangeMax: getRangeMax(),
  }
}
export function setSettings(settings: {seed: string, randomSeed: boolean, rangeMin: number, rangeMax: number}) {
  seed = settings.seed;
  randomSeed = settings.randomSeed;
  rangeMin = settings.rangeMin;
  rangeMax = settings.rangeMax;
}

export async function initSetup() {
  await loadSettings();
  saveSettings();
  init = true;
}
