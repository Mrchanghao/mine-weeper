import { Cell, Coords, Field } from './Field';

export const getNeighborsItems = ([y, x]: Coords): Record<
  string,
  [number, number]
> => {
  return {
    top: [y - 1, x],
    topRight: [y - 1, x + 1],
    right: [y, x + 1],
    rightBottom: [y + 1, x],
    bottom: [y + 1, x],
    bottomLeft: [y + 1, x - 1],
    left: [y, x - 1],
    leftTop: [y - 1, x - 1],
  };
};
// length arr의 길이 속성을 가져와서 사용
export const checkItemInField = ([y, x]: Coords, { length }: Field): boolean =>
  y > 0 && x > 0 && length - y > 0 && length - x > 0;

export const incrementNeighbors = (coords: Coords, field: Field): Field => {
  const item = getNeighborsItems(coords);
  for (const [y, x] of Object.values(item)) {
    if (checkItemInField([y, x], field)) {
      const cell = field[y][x];
      if (cell < 8) {
        field[y][x] = (cell + 1) as Cell;
      }
    }
  }

  return field;
};
