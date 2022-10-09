import ICell from '../interfaces/ICell';
import IHandleDownPressAction from '../interfaces/IHandleDownPressAction';
const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const obstacle = '/assets/images/obstacle.png';

export default class HandleDownPressAction implements IHandleDownPressAction {
  constructor() {}

  handleDownAction = (
    playerLocation: number,
    boxLocations: ICell[],
    currentArrangement: Array<ICell>,
    width: number
  ) => {
    const playersNewLocation: ICell =
      currentArrangement[playerLocation + width];
    if (
      playersNewLocation !== undefined &&
      playersNewLocation.content !== obstacle
    ) {
      this.processDownMovement(
        boxLocations,
        currentArrangement,
        width,
        playerLocation
      );
    }
  };

  private processDownMovement = (
    boxLocations: ICell[],
    currentArrangement: ICell[],
    width: number,
    playerLocation: number
  ) => {
    const boxesNewLocations: ICell[] = boxLocations.map<ICell>(
      (cell: ICell) => {
        return currentArrangement[cell.index + width];
      }
    );
    boxesNewLocations.reverse().forEach((cell: ICell) => {
      if (
        cell !== undefined &&
        cell.content !== obstacle &&
        cell.content !== box
      ) {
        currentArrangement[cell.index].content = box;
        currentArrangement[cell.index - width].content = emptySpace;
      }
    });
    if (currentArrangement[playerLocation + width].content !== box) {
      currentArrangement[playerLocation + width].content = player;
      currentArrangement[playerLocation].content =
        currentArrangement[playerLocation].content === box ? box : emptySpace;
    }
  };
}
