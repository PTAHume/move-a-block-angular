import ICell from '../interfaces/ICell';
const box = '/assets/images/box.png';
const LevelCompleteCheck = (
  currentArrangement: Array<ICell>,
  goalLocations: Array<ICell>,
  level: number,
  GameSetUp: Function
) => {
  if (
    currentArrangement
      .filter((cell: ICell) => cell.content === box)
      .every((cell: ICell) => {
        return !(
          goalLocations.findIndex(
            (value: ICell) => value.index === cell.index
          ) === -1
        );
      })
  ) {
    setTimeout(() => {
      alert('you win !');
      level = level + 1;
      GameSetUp(level);
    }, 10);
  }
};
export default LevelCompleteCheck;
