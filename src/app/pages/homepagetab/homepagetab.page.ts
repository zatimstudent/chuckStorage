import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-homepagetab',
  templateUrl: './homepagetab.page.html',
  styleUrls: ['./homepagetab.page.scss'],
})
export class HomepagetabPage implements OnInit {

  listData: any[] = [];

  constructor(private dataService: DataService, private http: HttpClient) {
    this.loadData();
  }

  async loadData(){
    this.dataService.getData().subscribe(res =>{
      this.listData = res;
    });
  }

  async addData(){
    this.http.get('https://api.chucknorris.io/jokes/random').subscribe(data => {
      this.listData.unshift(data);
    });
  }

  async removeItem(index: number){
    this.dataService.removeItem(index);
    this.listData.splice(index,1);
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnInit() {
  }

}