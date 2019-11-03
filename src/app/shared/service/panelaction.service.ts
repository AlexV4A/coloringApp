import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionObject } from '../model/state.model';

@Injectable({
  providedIn: 'root'
})
export class PanelactionService {

  private colorActionEvent = new BehaviorSubject<ActionObject>({id : '', background: '', width : '', height: ''});

  public _colorEvent: Observable<ActionObject> = this.colorActionEvent.asObservable();
  
  constructor() { }

  public setColorActionUpdate(colorObject: ActionObject) {
    this.colorActionEvent.next(Object.assign({}, colorObject));
  }

  public getColorActionUpdate() : Observable<ActionObject> {
    return this.colorActionEvent.asObservable();
  }

}
