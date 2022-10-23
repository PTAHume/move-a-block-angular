import ICell from '../interfaces/ICell';
import IHandleLeftPressAction from '../interfaces/IHandleLeftPressAction';

const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const obstacle = '/assets/images/obstacle.png';
const invalid = '/assets/images/invalid.png';
const rightBoundary: number[] = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];

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
    } else {
      currentArrangement[playerLocation].content = invalid;
    }
  };

  private processLeftMovement = (
    boxLocations: ICell[],
    currentArrangement: ICell[],
    playerLocation: number
  ) => {
    const reverseBadMove: number[] = this.moveBoxes(
      boxLocations,
      currentArrangement
    );
    this.movePlayer(currentArrangement, playerLocation, reverseBadMove);
  };

  private moveBoxes(boxLocations: ICell[], currentArrangement: ICell[]) {
    const boxesNewLocations: ICell[] = boxLocations.map<ICell>(
      (cell: ICell) => {
        return currentArrangement[cell.index - 1];
      }
    );
    const reverseBadMove: number[] = [];
    boxesNewLocations.forEach((cell: ICell) => {
      if (
        cell !== undefined &&
        cell.content !== obstacle &&
        rightBoundary.includes(cell.index) === false &&
        cell.content !== box
      ) {
        currentArrangement[cell.index].content = box;
        currentArrangement[cell.index + 1].content = emptySpace;
        reverseBadMove.push(cell.index);
      }
    });
    return reverseBadMove;
  }

  private movePlayer(
    currentArrangement: ICell[],
    playerLocation: number,
    reverseBadMove: number[]
  ) {
    if (currentArrangement[playerLocation - 1].content !== box) {
      currentArrangement[playerLocation - 1].content = player;
      currentArrangement[playerLocation].content =
        currentArrangement[playerLocation].content === box ? box : emptySpace;
    } else if (currentArrangement[playerLocation - 1].content == box) {
      currentArrangement[playerLocation].content = invalid;
      reverseBadMove.forEach((index: number) => {
        currentArrangement[index].content =
          currentArrangement[index].content === invalid ? invalid : emptySpace;
        currentArrangement[index + 1].content = box;
      });
    }
  }
}
