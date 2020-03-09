import { Component, OnInit, ChangeDetectorRef, Output } from '@angular/core';
import { ColorObject, ActionObject } from '../shared/model/state.model';
import * as d3 from "d3v4";
import { CommonService } from '../shared/service/common.service';
import { PanelactionService } from '../shared/service/panelaction.service';
import { takeWhile } from 'rxjs/operators';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-gamelogger',
  templateUrl: './gamelogger.component.html',
  styleUrls: ['./gamelogger.component.css']
})
export class GameloggerComponent implements OnInit {

  public colors : Array<ColorObject> = [];
  public duration = 2000;
  public repeat = 0;
  public stopwatch_timer;
  public count = 0;
  public stopwatch_interval;
  private _stateObject : ActionObject;
  private _pckdColor : string = '';

  // @Output colorChange: EventEmitter<String> = new EventEmitter();

  constructor(private _commonService : CommonService,
    private cdr: ChangeDetectorRef,
    private _panelActionState : PanelactionService) {
  }

  ngOnInit() {
    this._setConfiguration();
    // this.startGameSetup(0);
  }

  ngAfterViewInit() {
  }

  private _setConfiguration() : void {
    
    this._panelActionState.getGameColorActionUpdate().pipe(takeWhile(()=> {
      return true;
    })).subscribe((state : ActionObject) =>{
      this._stateObject = {...state};
      if(state.action === 'START'){
        this.startNewGame();
      }
      else if(state.action === 'DONE'){
        
      }
    })
  }


  startNewGame(){

    this._pckdColor = this._commonService.getRandomColor();
    console.log('CHECK ', this._pckdColor);
    this._panelActionState.setGameColorActionUpdate({...this._stateObject, 
      background : this._pckdColor, 
      action: ''});
    
    this.colors = [{value : this._pckdColor,selected : false}];
    this.cdr.detectChanges();
    
    this.stopwatch_interval = d3.interval(()=>{
      this.stopwatch_single_turn(this.duration)
      this.count += 1
      if (this.count >= this.repeat) { this.stopwatch_interval.stop() }
    }, this.duration)
  
    this.stopwatch_single_turn(this.duration)
  }

  draw_stopwatch_arc(angle){

    var r = 7.4
    var cx = 23.8
    var cy = 24.1
  
    var px = r * Math.sin(angle)
    var py = -1 * r * Math.cos(angle)
  
    var d = "M" + cx + "," + cy + " "
    d += "l" + px + "," + py + " "
    if (angle < Math.PI) {
      d += "A " + r + " " + r + " 0 0 0 " + (cx) + " " + (cy - r) + " "
    } else {
      d += "A " + r + " " + r + " 0 0 0 " + (cx) + " " + (cy + r) + " "
      d += "A " + r + " " + r + " 0 0 0 " + (cx) + " " + (cy - r) + " "
    }
  
    d3.select(".stopwatch-center")
      .transition().duration(0)
        .attr("d", d)
  
  }
  
  stopwatch_single_turn(duration){
    if (this.stopwatch_timer) { this.stopwatch_timer.stop() }
    this.stopwatch_timer = d3.timer((t)=>{
      if (t > duration) { 
        this.stopwatch_timer.stop();
        this._panelActionState.setGameColorActionUpdate({...this._stateObject, action : 'RESET'});
        
       }
      else { 
        this.draw_stopwatch_arc(t * 2 * Math.PI / duration) 
      }
    })
  }
  
}
