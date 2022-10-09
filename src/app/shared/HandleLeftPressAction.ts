import ICell from '../interfaces/ICell';
import IHandleLeftPressAction from '../interfaces/IHandleLeftPressAction';
const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const obstacle = '/assets/images/obstacle.png';
const rightBoundary: number[] = [7, 15, 23, 31, 39, 47, 55, 63];

export default class HandleLeftPressAction implements IHandleLeftPressAction {
  constructor() {}

  handleLeftAction = (
    playerLocation: number,
    boxLocations: ICell[],
    currentArrangement: Array<ICell>
  ) => {
    const playersNewLocation: ICell = currentArrangement[playerLocation - 1];
    if (
      playersNewLocation !== undefined &&
      playersNewLocation.content !== obstacle &&
      rightBoundary.includes(playerLocation - 1) === false
    ) {
      this.processLeftMovement(
        boxLocations,
        currentArrangement,
        playerLocation
      );
    }
  };

  private processLeftMovement = (
    boxLocations: ICell[],
    currentArrangement: ICell[],
    playerLocation: number
  ) => {
    const boxesNewLocations: ICell[] = boxLocations.map<ICell>(
      (cell: ICell) => {
        return currentArrangement[cell.index - 1];
      }
    );
    boxesNewLocations.forEach((cell: ICell) => {
      if (
        cell !== undefined &&
        cell.content !== obstacle &&
        rightBoundary.includes(cell.index) === false &&
        cell.content !== box
      ) {
        currentArrangement[cell.index].content = box;
        currentArrangement[cell.index + 1].content = emptySpace;
      }
    });
    if (currentArrangement[playerLocation - 1].content !== box) {
      currentArrangement[playerLocation - 1].content = player;
      currentArrangement[playerLocation].content =
        currentArrangement[playerLocation].content === box ? box : emptySpace;
    }
  };
}
