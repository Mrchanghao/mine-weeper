import { emptyFieldGenerator, CellState, fieldGenerator, Cell } from './Field';

const { empty, bomb, hidden } = CellState;
const cellWithBombFilter = (cell: Cell) => cell === bomb;

describe('Field Generator ', () => {
  describe('empty field test', () => {
    it('2 x 2', () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });

    it('3 x 3', () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });

    it('3 x 3 with hidden', () => {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });

  describe('field generator simple test', () => {
    it('wrong probability', () => {
      const errorText = 'probability must be between 0 or 1';
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });

    it('smallest possible field no mine ', () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });

    it('big field possible field no mine ', () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
      ]);
    });

    it('smallest possible field all mine ', () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });

    it('middle possible field all mine ', () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });

    it('middle possible field 50% mine ', () => {
      // random position

      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat(); // [9, 9, 0, 0] --> 1차원 어레이로

      const emptyCell = flatField.filter((cell) => cell === empty);
      const bombCell = flatField.filter((cell) => cell === bomb);

      expect(emptyCell).toHaveLength(2);
      expect(bombCell).toHaveLength(2);
    });

    it('real game field size 10 x 10 1 / 4 확률 cell', () => {
      const size = 10;
      const mines = 25;

      const probability = mines / (size * size);
      const field = fieldGenerator(size, probability);

      console.table(field);
      console.table(field.flat());

      const flatField = field.flat();
      expect(flatField.filter(cellWithBombFilter)).toHaveLength(25);
    });
  });
});
