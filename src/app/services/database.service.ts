import { Injectable } from '@angular/core';
import {Preferences} from "@capacitor/preferences";
import {Joke} from "../interfaces/joke";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  /**
   * gets name of table and values that will be set instead of the current ones.
   * !! data always stringyfied by this method !!
   *
   * @param key is like name of table
   * @param data could be any format, will be stringyfied.
   */
  async setData(key: string, data: any) {
    await Preferences.set({key: key, value: JSON.stringify(data),
    });
  }
  async getData(key: string) {
    const jokes = await Preferences.get({key: key});
    return JSON.parse(<string>jokes.value);
  }

  async delete(key:string){
    await Preferences.remove({key});
  }
  async clear(){
    await Preferences.clear();
  }
}
