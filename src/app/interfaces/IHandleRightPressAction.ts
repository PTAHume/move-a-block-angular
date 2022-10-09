import ICell from '../interfaces/ICell';
export default interface IHandleRightPressAction {
  handleRightAction(
    playerLocation: number,
    boxLocations: ICell[],
    currentArrangement: Array<ICell>
  ): void;
}
