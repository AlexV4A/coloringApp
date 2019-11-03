import { Component, OnInit } from '@angular/core';
import { PanelactionService } from '../shared/service/panelaction.service';
import { ActionObject, ContainerObject, ContainerPointObject } from '../shared/model/state.model';
import { takeWhile } from 'rxjs/operators';
import * as d3 from "d3v4";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public containers : Array<ContainerObject> = [];
  public containerPoints : Array<ContainerPointObject> = [];

  private _stateObject : ActionObject;

  private _d3Object : any;

  constructor(private _panelActionState : PanelactionService) { }

  ngOnInit() {
    this._setupConfiguration();

    let containterArray =[]
    let i = 50;
    let j = 50;
    for(let i=50; i < 600; i+40){
      for(let j=50; j< 600; j+40) {
        // this.containers.push({top : i+'px', left : j+'px', background: 'red', id: 'A'+i+j});
        this.containerPoints.push({x : i, y : j, color: 'red', id: 'A'+i+j});
        j = j+40;
      }
      i = i+40;
    }
    
  }

  ngAfterViewInit() {

      this._d3Object = d3.select(".container-article-class")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .call(d3.zoom().on("zoom", ()=> {
        this._d3Object.attr("transform", d3.event.transform)
      }))
      .append("g")

      var circles = this._d3Object.selectAll("rect")
                          .data(this.containerPoints)
                          .enter()
                          .append("rect")
                          .attr("x", (d) => {return d.x})
                          .attr("y", (d) => {return d.y})
                          .attr("fill", (d) => {return d.color})
                          .attr("border", '1px solid white')
                          .attr("width", '40px')
                          .attr("height", '40px') // Get attributes from circleAttrs var
                          .on("click", (d) => {this.selectedConatiner(d)});
  }

  // private _produceXOrder():Array<any>{

  // }

  private _setupConfiguration() : void {
    this._panelActionState.getColorActionUpdate().pipe(takeWhile(()=> {
      return true;
    })).subscribe((state : ActionObject) =>{
      this._stateObject = {...state};
      if (state.id !== '' && state.background !== '') {
        this.containerPoints[this.containerPoints.findIndex((e) => e.id === state.id)].color = state.background;
        var circles = this._d3Object.selectAll("rect")
                          .data(this.containerPoints)
                          .enter()
                          .append("rect")
                          .attr("x", (d) => {return d.x})
                          .attr("y", (d) => {return d.y})
                          .attr("fill", (d) => {return d.color})
                          .attr("border", '1px solid white')
                          .attr("width", '40px')
                          .attr("height", '40px') // Get attributes from circleAttrs var
                          .on("click", (d) => {this.selectedConatiner(d)});
      }
    })
  }

  public selectedConatiner(container : ContainerObject): void {
    this._panelActionState.setColorActionUpdate({...this._stateObject, id : container.id});
  }

}
