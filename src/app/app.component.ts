import { Component, OnInit } from '@angular/core';
import Cell from './shared/Cell';
import ICell from './interfaces/ICell';
import HandleUpPressAction from './shared/HandleUpPressAction';
import HandleDownPressAction from './shared/HandleDownPressAction';
import HandleLeftPressAction from './shared/HandleLeftPressAction';
import HandleRightPressAction from './shared/HandleRightPressAction';
import LevelCompleteCheck from './shared/LevelCompleteCheck';
import ResetGoals from './shared/ResetGoals';

const width: number = 10;

const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const goal = '/assets//images/goal.png';
const invalid = '/assets/images/invalid.png';

const moveUp: string = 'ArrowUp';
const moveDown: string = 'ArrowDown';
const moveLeft: string = 'ArrowLeft';
const moveRight: string = 'ArrowRight';

const { handleUpAction } = new HandleUpPressAction();
const { handleDownAction } = new HandleDownPressAction();
const { handleLeftAction } = new HandleLeftPressAction();
const { handleRightAction } = new HandleRightPressAction();

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
  currentArrangement: Array<ICell> = Array<ICell>();
  goalLocations: Array<ICell> = Array<ICell>();

  data = [
    {
      content: '/assets/images/player.png',
      index: 10,
    },
    {
      content: '/assets/images/box.png',
      index: 17,
    },
    {
      content: '/assets//images/goal.png',
      index: 27,
    },
    {
      content: '/assets/images/obstacle.png',
      index: 35,
    },
    {
      content: '/assets/images/box.png',
      index: 47,
    },
    {
      content: '/assets//images/goal.png',
      index: 52,
    },
    {
      content: '/assets/images/obstacle.png',
      index: 55,
    },
  ];

  GameSetUp = () => {
    this.currentArrangement = [...Array(100)].map(
      (cell: ICell, index: number) => {
        return new Cell({ content: emptySpace, index: index });
      }
    );

    let response = <ICell[]>JSON.parse(JSON.stringify(this.data));
    response.forEach((cell) => {
      this.currentArrangement[cell.index] = new Cell({
        content: cell.content,
        index: cell.index,
      });
    });
    // this.currentArrangement[10] = new Cell({ content: player, index: 10 });
    // this.currentArrangement[37] = new Cell({ content: obstacle, index: 37 });
    // this.currentArrangement[27] = new Cell({ content: goal, index: 27 });
    // this.currentArrangement[17] = new Cell({ content: box, index: 17 });
    // this.currentArrangement[57] = new Cell({ content: obstacle, index: 57 });
    // this.currentArrangement[47] = new Cell({ content: box, index: 47 });
    // this.currentArrangement[52] = new Cell({ content: goal, index: 52 });
  };

  ngOnInit() {
    this.GameSetUp();
    this.goalLocations = this.currentArrangement.filter(
      (cell: ICell) => cell.content === goal
    );
  }

  handleKeyUpEvent(event: KeyboardEvent) {
    if (
      this.keyDown == true &&
      (moveUp === event.key ||
        moveDown === event.key ||
        moveLeft === event.key ||
        moveRight === event.key)
    ) {
      event.preventDefault();
      this.currentArrangement
        .filter((cell: ICell) => cell.content === invalid)
        .forEach((cell: ICell) => {
          this.currentArrangement[cell.index].content = player;
        });
      this.keyDown = false;
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
      event.preventDefault();
      this.keyDown = true;

      this.checkKeyEvent(event);

      ResetGoals(this.currentArrangement, this.goalLocations);

      LevelCompleteCheck(this.currentArrangement, this.goalLocations);
    }
  }

  private checkKeyEvent(event: KeyboardEvent) {
    const boxLocations: ICell[] = this.currentArrangement.filter(
      (cell: ICell) => cell.content === box
    );
    const playerLocation: number = this.currentArrangement.findIndex(
      (value: ICell) => value.content === player
    );
    if (moveUp === event.key) {
      handleUpAction(
        playerLocation,
        boxLocations,
        this.currentArrangement,
        width
      );
    } else if (moveDown === event.key) {
      handleDownAction(
        playerLocation,
        boxLocations,
        this.currentArrangement,
        width
      );
    } else if (moveLeft === event.key) {
      handleLeftAction(playerLocation, boxLocations, this.currentArrangement);
    } else if (moveRight === event.key) {
      handleRightAction(playerLocation, boxLocations, this.currentArrangement);
    }
  }
}
