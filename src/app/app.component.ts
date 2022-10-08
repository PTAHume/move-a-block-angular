import { Component, OnInit, HostListener } from '@angular/core';
import Cell from './shared/Cell';

const width: number = 8;
const leftBoundary: number[] = [0, 8, 16, 24, 32, 40, 48, 56];
const rightBoundary: number[] = [7, 15, 23, 31, 39, 47, 55, 63];
const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const goal = '/assets//images/goal.png';
const obstacle = '/assets/images/obstacle.png';
const moveUp: string = 'ArrowUp';
const moveDown: string = 'ArrowDown';
const moveLeft: string = 'ArrowLeft';
const moveRight: string = 'ArrowRight';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'handleKeyDownEvent($event)',
    '(document:keyup)': 'handleKeyUpEvent($event)',
  },
})
export class AppComponent implements OnInit {
  keyDown = false;
  currentArrangement: Array<Cell> = Array<Cell>();
  GameSetUp = () => {
    this.currentArrangement = [...Array(64)].map(
      (cell: Cell, index: number) => {
        return new Cell({ content: emptySpace, index: index });
      }
    );

    this.currentArrangement[10] = new Cell({ content: player, index: 10 });
    this.currentArrangement[37] = new Cell({ content: obstacle, index: 37 });
    this.currentArrangement[27] = new Cell({ content: goal, index: 27 });
    this.currentArrangement[17] = new Cell({ content: box, index: 17 });
    this.currentArrangement[57] = new Cell({ content: obstacle, index: 57 });
    this.currentArrangement[47] = new Cell({ content: box, index: 47 });
  };
  ngOnInit() {
    this.GameSetUp();
  }
  handleKeyUpEvent(event: KeyboardEvent) {
    if (
      this.keyDown == true &&
      (moveUp === event.key ||
        moveDown === event.key ||
        moveLeft === event.key ||
        moveRight === event.key)
    ) {
      this.keyDown = false;
      event.preventDefault();
    }
  }
  handleKeyDownEvent(event: KeyboardEvent) {
    if (
      this.keyDown == false &&
      (moveUp === event.key ||
        moveDown === event.key ||
        moveLeft === event.key ||
        moveRight === event.key)
    ) {
      this.keyDown = true;
      event.preventDefault();
      const boxLocations: Cell[] = this.currentArrangement.filter(
        (cell: Cell) => cell.content === box
      );
      const playerLocation: number = this.currentArrangement.findIndex(
        (value: Cell) => value.content === player
      );

      if (moveUp === event.key) {
        const playersNewLocation: Cell =
          this.currentArrangement[playerLocation - width];
        if (
          playersNewLocation !== undefined &&
          playersNewLocation.content !== obstacle
        ) {
          const boxesNewLocations: Cell[] = boxLocations.map<Cell>(
            (cell: Cell) => {
              return this.currentArrangement[cell.index - width];
            }
          );
          boxesNewLocations.forEach((cell: Cell) => {
            if (
              cell !== undefined &&
              cell.content !== obstacle &&
              cell.content !== box
            ) {
              this.currentArrangement[cell.index].content = box;
              this.currentArrangement[cell.index + width].content = emptySpace;
            }
          });
          if (this.currentArrangement[playerLocation - width].content !== box) {
            this.currentArrangement[playerLocation - width].content = player;
            this.currentArrangement[playerLocation].content =
              this.currentArrangement[playerLocation].content === box
                ? box
                : emptySpace;
          }
        }
      } else if (moveDown === event.key) {
        const playersNewLocation: Cell =
          this.currentArrangement[playerLocation + width];
        if (
          playersNewLocation !== undefined &&
          playersNewLocation.content !== obstacle
        ) {
          const boxesNewLocations: Cell[] = boxLocations.map<Cell>(
            (cell: Cell) => {
              return this.currentArrangement[cell.index + width];
            }
          );
          boxesNewLocations.reverse().forEach((cell: Cell) => {
            if (
              cell !== undefined &&
              cell.content !== obstacle &&
              cell.content !== box
            ) {
              this.currentArrangement[cell.index].content = box;
              this.currentArrangement[cell.index - width].content = emptySpace;
            }
          });
          if (this.currentArrangement[playerLocation + width].content !== box) {
            this.currentArrangement[playerLocation + width].content = player;
            this.currentArrangement[playerLocation].content =
              this.currentArrangement[playerLocation].content === box
                ? box
                : emptySpace;
          }
        }
      } else if (moveLeft === event.key) {
        const playersNewLocation: Cell =
          this.currentArrangement[playerLocation - 1];
        if (
          playersNewLocation !== undefined &&
          playersNewLocation.content !== obstacle &&
          rightBoundary.includes(playerLocation - 1) === false
        ) {
          const boxesNewLocations: Cell[] = boxLocations.map<Cell>(
            (cell: Cell) => {
              return this.currentArrangement[cell.index - 1];
            }
          );
          boxesNewLocations.forEach((cell: Cell) => {
            if (
              cell !== undefined &&
              cell.content !== obstacle &&
              rightBoundary.includes(cell.index) === false &&
              cell.content !== box
            ) {
              this.currentArrangement[cell.index].content = box;
              this.currentArrangement[cell.index + 1].content = emptySpace;
            }
          });
          if (this.currentArrangement[playerLocation - 1].content !== box) {
            this.currentArrangement[playerLocation - 1].content = player;
            this.currentArrangement[playerLocation].content =
              this.currentArrangement[playerLocation].content === box
                ? box
                : emptySpace;
          }
        }
      } else if (moveRight === event.key) {
        const playersNewLocation: Cell =
          this.currentArrangement[playerLocation + 1];
        if (
          playersNewLocation !== undefined &&
          playersNewLocation.content !== obstacle &&
          leftBoundary.includes(playerLocation + 1) === false
        ) {
          const boxesNewLocations: Cell[] = boxLocations.map<Cell>(
            (cell: Cell) => {
              return this.currentArrangement[cell.index + 1];
            }
          );
          boxesNewLocations.reverse().forEach((cell: Cell) => {
            if (
              cell !== undefined &&
              cell.content !== obstacle &&
              leftBoundary.includes(cell.index) === false &&
              cell.content !== box
            ) {
              this.currentArrangement[cell.index].content = box;
              this.currentArrangement[cell.index - 1].content = emptySpace;
            }
          });
          if (this.currentArrangement[playerLocation + 1].content !== box) {
            this.currentArrangement[playerLocation + 1].content = player;
            this.currentArrangement[playerLocation].content =
              this.currentArrangement[playerLocation].content === box
                ? box
                : emptySpace;
          }
        }
      }
    }
  }
}
