export const EMPTY_BOARD = [
  [null, null, null], 
  [null, null, null], 
  [null, null, null] 
];

export const SYMBOL_X = "X";
export const SYMBOL_O = "O";
export const FIRST = "first";
export const SECOND = "second";


const BASE_URL = "http://localhost:8000";
export const START_ENDPOINT = `${BASE_URL}/start`;
export const MAKE_MOVE_ENDPOINT = `${BASE_URL}/make_move`;
