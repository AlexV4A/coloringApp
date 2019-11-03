import { Component, OnInit } from '@angular/core';
import { PanelactionService } from '../shared/service/panelaction.service';
import { ColorObject, ActionObject } from '../shared/model/state.model';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {
  public colors : Array<ColorObject> = [{value: 'red', selected : false}, 
                                    {value: 'blue', selected : false}, 
                                    {value: 'green', selected : false}, 
                                    {value: 'orange', selected : false},];

  private _colorObject : ColorObject;
  private _stateObject : ActionObject;
  constructor(private _panelActionState : PanelactionService) { }

  ngOnInit() {
    this._setConfiguration();
  }

  private _setConfiguration() : void {
    
    this._panelActionState.getColorActionUpdate().pipe(takeWhile(()=> {
      return true;
    })).subscribe((state : ActionObject) =>{
      this._stateObject = {...state};
      this.colors.map((c) => {c.selected = false});
      if(state.background !== '') {
        this.colors[this.colors.findIndex((e) => e.value === state.background)].selected = true;
      }
      
    })
  }

  public selectColor (color : ColorObject) : void {
    this._panelActionState.setColorActionUpdate({...this._stateObject, background : color.value});
  }
}
