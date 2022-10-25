import ICell from 'src/app/interfaces/ICell';

const emptySpace = '/assets/images/blank.png';
const goal = '/assets//images/goal.png';
const ResetGoals = (
  currentArrangement: Array<ICell>,
  goalLocations: Array<ICell>
) => {
  goalLocations.forEach(
    (cell: ICell) =>
      (currentArrangement[cell.index].content =
        currentArrangement[cell.index].content === emptySpace
          ? goal
          : currentArrangement[cell.index].content)
  );
};
export default ResetGoals;
