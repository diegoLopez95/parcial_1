import { Component, OnInit } from '@angular/core';

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit{
  players: Player[] = [];

  constructor(private playerService: PlayerService){ }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers()
    .subscribe(players => {
      players.map( (player:any) => {
        let newPlayer ={
          id: player.id,
          name: player.name,
          surname: player.surname,
          position: player.position,
          image: player.image,
          height: player.height,
          weight: player.weight,
          number: player.number,
          club: player.club
        }
        this.players.push(newPlayer);
      })
    });
    console.log(this.players);
  }

  add(name: string,surname: string, position: string, image: string, height: string,
      weight: string, number: string, club: string): void {
    name = name.trim();
    if (this.players.length === 23) { 
      console.log("Ya tiene 23 jugadores");
      return; 
    }
    if (!name) { 
      console.log("No ha ingresado nombre.");
      return; 
    }
    if (!surname) { 
      console.log("No ha ingresado apellido.");
      return; 
    }
    if (!position) { 
      console.log("No ha ingresado posición.");
      return; 
    }
    if (!image) { 
      console.log("No ha ingresado ruta de imagen.");
      return; 
    }
    this.playerService.addPlayer({ name, surname, position, image, height, weight, number, club } as Player)
      .subscribe(player => {
        this.players.push(player);
      });
  }

  delete(player: Player): void {
    this.players = this.players.filter(p => p !== player);
    this.playerService.deletePlayer(player.id).subscribe();
  }

}
