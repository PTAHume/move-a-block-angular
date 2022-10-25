import ICell from './ICell';
export default interface IHandleUpPressAction {
  handleDownAction(
    playerLocation: number,
    boxLocations: ICell[],
    currentArrangement: Array<ICell>,
    width: number
  ): void;
}
