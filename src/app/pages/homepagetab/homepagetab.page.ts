import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../services/database.service';
import {Joke} from "../../interfaces/joke";
import {Preferences} from "@capacitor/preferences";

@Component({
  selector: 'app-homepagetab',
  templateUrl: './homepagetab.page.html',
  styleUrls: ['./homepagetab.page.scss'],
})
export class HomepagetabPage implements OnInit {


  listData: any[] = [];

  constructor(private http: HttpClient, private storage: DatabaseService) {
    this.loadData();
  }

  /**
   * object joke passed and added to the stringyfied list of table values
   *
   * @param joke Object in the interface of Joke.
   */
  addJokeToFavorite(joke: Joke){
    console.log(joke);
    this.storage.getData('jokes').then(res => {
      if(res === null) {
        this.storage.setData('jokes', joke);
        return;
      }
      let jokesList = JSON.parse(res.value);
      let jokeExists = jokesList.find((j: { id: string; }) => j.id === joke.id);
      if (!jokeExists) {
        jokesList.unshift(joke);
        this.storage.setData('jokes', jokesList);
      }
    })
  }


  async loadData(){
      return this.listData;
  }

  async addData(){
    this.http.get('https://api.chucknorris.io/jokes/random').subscribe(data => {
      this.listData.unshift(data);
      //console.log(this.listData);
    });
  }

  async removeItem(i: number) {
    this.listData.splice(i, 1);
  }


  ngOnInit() {
  }
}
