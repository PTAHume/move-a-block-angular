import ICell from '../interfaces/ICell';
const box = '/assets/images/box.png';
const LevelCompleteCheck = (
  currentArrangement: Array<ICell>,
  goalLocations: Array<ICell>
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
    }, 10);
  }
};
export default LevelCompleteCheck;
