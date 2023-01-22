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
  jokes: Joke[] = [];
  constructor(public storage: DatabaseService) {

  }
  removeJokeFromFavorites(joke: Joke){
    this.storage.getData('jokes').then(res => {
      let jokesList = JSON.parse(res.value);
      jokesList = jokesList.filter((j: { id: string; }) => j.id !== joke.id);
      this.storage.setData('jokes',jokesList);
    })
  }

  ngOnInit() {
    this.storage.getData("jokes").then(data => {
      this.jokes = data;
    });
  }

}
