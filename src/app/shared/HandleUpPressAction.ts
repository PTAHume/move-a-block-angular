import ICell from '../interfaces/ICell';
import IHandleUpPressAction from '../interfaces/IHandleUpPressAction';
const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const obstacle = '/assets/images/obstacle.png';

export default class HandleUpPressAction implements IHandleUpPressAction {
  constructor() {}

  handleUpAction = (
    playerLocation: number,
    boxLocations: ICell[],
    currentArrangement: Array<ICell>,
    width: number
  ) => {
    const playersNewLocation: ICell =
      currentArrangement[playerLocation - width];
    if (
      playersNewLocation !== undefined &&
      playersNewLocation.content !== obstacle
    ) {
      this.processUpMovement(
        boxLocations,
        playerLocation,
        currentArrangement,
        width
      );
    }
  };

  private processUpMovement = (
    boxLocations: ICell[],
    playerLocation: number,
    currentArrangement: Array<ICell>,
    width: number
  ) => {
    const boxesNewLocations: ICell[] = boxLocations.map<ICell>(
      (cell: ICell) => {
        return currentArrangement[cell.index - width];
      }
    );
    boxesNewLocations.forEach((cell: ICell) => {
      if (
        cell !== undefined &&
        cell.content !== obstacle &&
        cell.content !== box
      ) {
        currentArrangement[cell.index].content = box;
        currentArrangement[cell.index + width].content = emptySpace;
      }
    });
    if (currentArrangement[playerLocation - width].content !== box) {
      currentArrangement[playerLocation - width].content = player;
      currentArrangement[playerLocation].content =
        currentArrangement[playerLocation].content === box ? box : emptySpace;
    }
  };
}
