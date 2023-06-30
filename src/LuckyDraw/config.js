import { createIndexedArray } from "../utils/ArrayUtils";

export const DEFAULT_CANDIDATES_NUMBER = createIndexedArray(100).map((v) => ({
  id: v,
  frontValue: v + 17,
  backValue: "",
  flipped: false
}));
