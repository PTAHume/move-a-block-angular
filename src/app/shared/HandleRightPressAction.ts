import ICell from '../interfaces/ICell';
import IHandleRightPressAction from '../interfaces/IHandleRightPressAction';
const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const obstacle = '/assets/images/obstacle.png';
const leftBoundary: number[] = [0, 8, 16, 24, 32, 40, 48, 56];

export default class HandleRightPressAction implements IHandleRightPressAction {
  constructor() {}

  handleRightAction = (
    playerLocation: number,
    boxLocations: ICell[],
    currentArrangement: Array<ICell>
  ) => {
    const playersNewLocation: ICell = currentArrangement[playerLocation + 1];
    if (
      playersNewLocation !== undefined &&
      playersNewLocation.content !== obstacle &&
      leftBoundary.includes(playerLocation + 1) === false
    ) {
      this.processRightMovement(
        boxLocations,
        currentArrangement,
        playerLocation
      );
    }
  };

  private processRightMovement = (
    boxLocations: ICell[],
    currentArrangement: ICell[],
    playerLocation: number
  ) => {
    const boxesNewLocations: ICell[] = boxLocations.map<ICell>(
      (cell: ICell) => {
        return currentArrangement[cell.index + 1];
      }
    );
    boxesNewLocations.reverse().forEach((cell: ICell) => {
      if (
        cell !== undefined &&
        cell.content !== obstacle &&
        leftBoundary.includes(cell.index) === false &&
        cell.content !== box
      ) {
        currentArrangement[cell.index].content = box;
        currentArrangement[cell.index - 1].content = emptySpace;
      }
    });
    if (currentArrangement[playerLocation + 1].content !== box) {
      currentArrangement[playerLocation + 1].content = player;
      currentArrangement[playerLocation].content =
        currentArrangement[playerLocation].content === box ? box : emptySpace;
    }
  };
}
