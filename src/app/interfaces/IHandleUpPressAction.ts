import ICell from '../interfaces/ICell';
export default interface IHandleUpPressAction {
  handleUpAction(
    playerLocation: number,
    boxLocations: ICell[],
    currentArrangement: Array<ICell>,
    width: number
  ): void;
}
