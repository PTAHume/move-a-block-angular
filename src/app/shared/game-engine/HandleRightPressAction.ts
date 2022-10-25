import ICell from 'src/app/interfaces/ICell';
import IHandleRightPressAction from 'src/app/interfaces/IHandleRightPressAction';

const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const obstacle = '/assets/images/obstacle.png';
const invalid = '/assets/images/invalid.png';
const leftBoundary: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

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
    } else {
      currentArrangement[playerLocation].content = invalid;
    }
  };

  private processRightMovement = (
    boxLocations: ICell[],
    currentArrangement: ICell[],
    playerLocation: number
  ) => {
    const reverseBadMove: number[] = this.moverBoxes(
      boxLocations,
      currentArrangement
    );
    this.movePlayer(currentArrangement, playerLocation, reverseBadMove);
  };

  private moverBoxes(boxLocations: ICell[], currentArrangement: ICell[]) {
    const boxesNewLocations: ICell[] = boxLocations.map<ICell>(
      (cell: ICell) => {
        return currentArrangement[cell.index + 1];
      }
    );
    const reverseBadMove: number[] = [];
    boxesNewLocations.reverse().forEach((cell: ICell) => {
      if (
        cell !== undefined &&
        cell.content !== obstacle &&
        leftBoundary.includes(cell.index) === false &&
        cell.content !== box
      ) {
        currentArrangement[cell.index].content = box;
        currentArrangement[cell.index - 1].content = emptySpace;
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
    if (currentArrangement[playerLocation + 1].content !== box) {
      currentArrangement[playerLocation + 1].content = player;
      currentArrangement[playerLocation].content =
        currentArrangement[playerLocation].content === box ? box : emptySpace;
    } else if (currentArrangement[playerLocation + 1].content == box) {
      currentArrangement[playerLocation].content = invalid;
      reverseBadMove.forEach((index: number) => {
        currentArrangement[index].content =
          currentArrangement[index].content === invalid ? invalid : emptySpace;
        currentArrangement[index - 1].content = box;
      });
    }
  }
}
