import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../services/database.service';
import {Joke} from "../../interfaces/joke";
import {firstValueFrom} from "rxjs";
import {Preferences} from "@capacitor/preferences";

@Component({
  selector: 'app-homepagetab',
  templateUrl: './homepagetab.page.html',
  styleUrls: ['./homepagetab.page.scss'],
})
export class HomepagetabPage implements OnInit {

  jokes: any[] | undefined;

  constructor(private http: HttpClient, private storage: DatabaseService) {
  }

  /**
   * object joke passed and added to the stringyfied list of table values
   *
   * @param joke Object in the interface of Joke.
   */
  async addJokeToFavorite(joke: Joke){
    console.log(joke);
    this.storage.getData('favjokes').then(res => {
      if(res === null) {
        this.storage.setData('favjokes', [joke]);
        return;}

      let jokesList = res;
      let jokeExists = jokesList.find((j: { id: string; }) => j.id === joke.id);
      if (!jokeExists) {
        jokesList.unshift(joke);
        this.storage.setData('favjokes', jokesList);
      }
    })
  }

  async addJoke(){
    let joke = await this.apiGet()
    console.log(joke)
    let storedJokes = await this.storage.getData('jokes');
    //console.log(joke);
    //console.log();
    console.log(storedJokes);
    if(typeof storedJokes === 'string') storedJokes = JSON.parse(storedJokes);
    if(!storedJokes || !Array.isArray(storedJokes)) storedJokes = []
    storedJokes.unshift(joke);
    this.jokes = storedJokes;
    //console.log(storedJokes)
    await Preferences.set({ key: 'jokes', value: JSON.stringify(storedJokes) });
  }

  /*async removeJoke(joke: Joke){
    this.storage.getData('jokes').then(res => {
      let jokesList = JSON.parse(res.value);
      jokesList = jokesList.filter((j: { id: string; }) => j.id !== joke.id);
      this.storage.setData('jokes',jokesList);
    })
  }*/

  async removeJoke(joke: Joke){
      let jokesList = await this.storage.getData('jokes');
      jokesList = jokesList.filter((j: { id: string; }) => j.id !== joke.id);
      await this.storage.setData('jokes',jokesList);
      this.jokes = jokesList;
  }

  async apiGet(){
    const url = 'https://api.chucknorris.io/jokes/random';
    /*return new Promise(resolve => {
      this.http.get(url).subscribe(data => {
        resolve(data);
      });
    })*/

    return firstValueFrom(this.http.get(url));
  }
  ngOnInit() {
    this.storage.getData("jokes").then(data => {
      this.jokes = data;
    });
  }
}
