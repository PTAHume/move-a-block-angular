import ICell from '../interfaces/ICell';
import IHandleDownPressAction from '../interfaces/IHandleDownPressAction';
const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const obstacle = '/assets/images/obstacle.png';
const invalid = '/assets/images/invalid.png';

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
    } else {
      currentArrangement[playerLocation].content = invalid;
    }
  };

  private processDownMovement = (
    boxLocations: ICell[],
    currentArrangement: ICell[],
    width: number,
    playerLocation: number
  ) => {
    const reverseBadMove: number[] = this.moveBoxes(
      boxLocations,
      currentArrangement,
      width
    );
    this.movePlayer(currentArrangement, playerLocation, width, reverseBadMove);
  };

  private moveBoxes(
    boxLocations: ICell[],
    currentArrangement: ICell[],
    width: number
  ) {
    const boxesNewLocations: ICell[] = boxLocations.map<ICell>(
      (cell: ICell) => {
        return currentArrangement[cell.index + width];
      }
    );
    const reverseBadMove: number[] = [];
    boxesNewLocations.reverse().forEach((cell: ICell) => {
      if (
        cell !== undefined &&
        cell.content !== obstacle &&
        cell.content !== box
      ) {
        currentArrangement[cell.index].content = box;
        currentArrangement[cell.index - width].content = emptySpace;
        reverseBadMove.push(cell.index);
      }
    });
    return reverseBadMove;
  }

  private movePlayer(
    currentArrangement: ICell[],
    playerLocation: number,
    width: number,
    reverseBadMove: number[]
  ) {
    if (currentArrangement[playerLocation + width].content !== box) {
      currentArrangement[playerLocation + width].content = player;
      currentArrangement[playerLocation].content =
        currentArrangement[playerLocation].content === box ? box : emptySpace;
    } else if (currentArrangement[playerLocation + width].content == box) {
      currentArrangement[playerLocation].content = invalid;
      reverseBadMove.forEach((index: number) => {
        currentArrangement[index].content =
          currentArrangement[index].content === invalid ? invalid : emptySpace;
        currentArrangement[index - width].content = box;
      });
    }
  }
}
