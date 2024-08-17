import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from "../models/game";
import { PlayerComponent } from '../player/player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialog
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game!: Game;  // Use the definite assignment assertion

  constructor(private dialog: MatDialog) { }  // Inject MatDialog

  

  ngOnInit(): void {
      this.newGame();
  }


  newGame(){
    this.game = new Game();
    console.log(this.game);
  }


  takeCard() {
    if (!this.pickCardAnimation)
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      if (this.currentCard) {
        this.game.playedCards.push(this.currentCard);
     }
      this.pickCardAnimation = false;
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0){
      this.game.players.push(name);}
      });
  }


}
