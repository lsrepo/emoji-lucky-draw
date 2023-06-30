import _ from "lodash";

export const createIndexedArray = (length) =>
  Array.from({ length }, (v, k) => k);

export const pickOneRandomly = (list) => list[_.random(list.length - 1)];

export const pickOneIndexRandomly = (list) => _.random(list.length - 1);

export const immutableSetNullAt = (list, index) =>
  list.map((v, i) => (index === i ? null : v));
