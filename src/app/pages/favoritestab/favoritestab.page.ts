import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Joke} from "../../interfaces/joke"
//import {jokes} from "../homepagetab/homepagetab.page"

@Component({
  selector: 'app-favoritestab',
  templateUrl: './favoritestab.page.html',
  styleUrls: ['./favoritestab.page.scss'],
})
export class FavoritestabPage implements OnInit {
  favjokes: Joke[] = [];
  constructor(public storage: DatabaseService) {

  }
  async removeJokeFromFavorites(joke: Joke){
    let jokesList = await this.storage.getData('jokes');
    jokesList = jokesList.filter((j: { id: string; }) => j.id !== joke.id);
    await this.storage.setData('jokes',jokesList);
    this.favjokes = jokesList;
  }

  ngOnInit() {
    this.storage.getData("favjokes").then(data => {
      this.favjokes = data;
    });
  }

}
