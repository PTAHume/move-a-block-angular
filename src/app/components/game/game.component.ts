import {
  Component,
  OnInit,
  EventEmitter,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { CdTimerModule } from 'angular-cd-timer';
import { Subscription } from 'rxjs';

import ICell from 'src/app/interfaces/ICell';
import LevelService from 'src/app/services/level.service';
import ResetGoals from 'src/app/shared/game-engine/ResetGoals';
import LevelCompleteCheck from 'src/app/shared/game-engine/LevelCompleteCheck';
import HandleUpPressAction from 'src/app/shared/game-engine/HandleUpPressAction';
import HandleDownPressAction from 'src/app/shared/game-engine/HandleDownPressAction';
import HandleLeftPressAction from 'src/app/shared/game-engine/HandleLeftPressAction';
import HandleRightPressAction from 'src/app/shared/game-engine/HandleRightPressAction';

const width: number = 10;

const emptySpace = '/assets/images/blank.png';
const player = '/assets/images/player.png';
const box = '/assets/images/box.png';
const goal = '/assets/images/goal.png';
const invalid = '/assets/images/invalid.png';
const obstacle = '/assets/images/obstacle.png';

const moveUp: string = 'ArrowUp';
const moveDown: string = 'ArrowDown';
const moveLeft: string = 'ArrowLeft';
const moveRight: string = 'ArrowRight';

const { handleUpAction } = new HandleUpPressAction();
const { handleDownAction } = new HandleDownPressAction();
const { handleLeftAction } = new HandleLeftPressAction();
const { handleRightAction } = new HandleRightPressAction();

@Component({
  selector: 'game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  keyDown = false;
  currentArrangement: Array<ICell> = Array<ICell>();
  goalLocations: Array<ICell> = Array<ICell>();
  level: number = 0;
  sub!: Subscription;

  constructor(private levelService: LevelService) {}

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {
    this.GameSetUp();
  }

  GameSetUp = (level: number = 0) => {
    this.currentArrangement = [...Array(100)].map(
      (cell: ICell, index: number) => {
        return { content: emptySpace, index: index };
      }
    );
    this.level = level;
    this.sub = this.levelService.LoadLevel(this.level).subscribe(
      (response: ICell[]) => {
        response.forEach(
          (result: ICell) =>
            (this.currentArrangement[result.index] = {
              content: result.content,
              index: result.index,
            })
        );
      },
      null,
      () => {
        this.goalLocations = this.currentArrangement.filter(
          (cell: ICell) => cell.content === goal
        );
      }
    );
  };

  @HostListener('window:keyup', ['$event']) handleKeyUpEvent(
    event: KeyboardEvent
  ) {
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
  @HostListener('window:keydown', ['$event']) handleKeyDownEvent(
    event: KeyboardEvent
  ) {
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

      LevelCompleteCheck(
        this.currentArrangement,
        this.goalLocations,
        this.level,
        this.GameSetUp
      );
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
