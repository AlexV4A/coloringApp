import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public checkLogin (username : string, password : string) : Observable<boolean> {
    return Observable.create( observable =>{
      return observable.next( (username === 'Allu' && password === 'Allu123'));
    })
  }

  public getRandomColor(){
    return '#'+Math.round(Math.random() * 255).toString(16)
    +Math.round(Math.random() * 255).toString(16);
  }
}
