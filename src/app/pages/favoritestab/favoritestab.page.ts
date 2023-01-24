import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Joke} from "../../interfaces/joke"

import { IonicModule } from '@ionic/angular';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-favoritestab',
  templateUrl: './favoritestab.page.html',
  styleUrls: ['./favoritestab.page.scss'],
})
export class FavoritestabPage implements OnInit {
  favjokes: Joke[] = [];
  constructor(public storage: DatabaseService) {

  }
  reloadFavorites() {
    this.storage.getData('favjokes').then((data) => {
      this.favjokes = data;
    });
  }

  async removeJokeFromFavorites(joke: Joke){
    let jokesList = await this.storage.getData('favjokes');
    jokesList = jokesList.filter((j: { id: string; }) => j.id !== joke.id);
    await this.storage.setData('favjokes',jokesList);
    this.favjokes = jokesList;
  }

  ngOnInit() {
    this.reloadFavorites()
  }

}
