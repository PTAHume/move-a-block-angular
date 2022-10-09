import ICell from '../interfaces/ICell';
export default interface IHandleLeftPressAction {
  handleLeftAction(
    playerLocation: number,
    boxLocations: ICell[],
    currentArrangement: Array<ICell>
  ): void;
}
