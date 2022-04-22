import { emptyFieldGenerator, CellState, fieldGenerator } from './Field';

const { empty, bomb, hidden } = CellState;

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
      expect(fieldGenerator(2, 0.5)).toStrictEqual([
        [bomb, bomb],
        [empty, empty],
      ]);
    });

    it('middle possible field 50% mine ', () => {
      // random position

      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat(); // [9, 9, 0, 0] --> 1차원 어레이로

      console.log(flatField);
      const emptyCell = flatField.filter((cell) => cell === empty);
      const bombCell = flatField.filter((cell) => cell === bomb);

      expect(emptyCell).toHaveLength(2);
      expect(bombCell).toHaveLength(2);
    });
  });
});
