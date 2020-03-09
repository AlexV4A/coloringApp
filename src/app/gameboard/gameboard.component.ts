import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PanelactionService } from '../shared/service/panelaction.service';
import { ActionObject, ContainerObject, ContainerPointObject } from '../shared/model/state.model';
import { takeWhile } from 'rxjs/operators';
import * as d3 from "d3v4";
import { ModalService } from '../shared/service/modal.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  public containers: Array<ContainerObject> = [];
  public containerPoints: Array<ContainerPointObject> = [];
  public orgContainerPoints: Array<ContainerPointObject> = [];

  private _stateObject: ActionObject;

  private _d3Object: any;
  private _renderObject: any;

  public startCounter = 5;
  public messageText = '';
  private _pckdColor: string = '';
  private _currentScore: number = 0;
  private _totalChance: number = 0;

  constructor(
    private _panelActionState: PanelactionService,
    private cdr: ChangeDetectorRef,
    private _modalService: ModalService) { }


  ngOnInit() {
    this._setupConfiguration();

    let containterArray = []
    let i = 50;
    let j = 50;
    for (let i = 50; i < 600; i + 40) {
      for (let j = 50; j < 600; j + 40) {
        // this.containers.push({top : i+'px', left : j+'px', background: 'red', id: 'A'+i+j});
        this.containerPoints.push({ x: i, y: j, color: 'red', id: 'A' + i + j });
        j = j + 40;
      }
      i = i + 40;
    }
    this.orgContainerPoints = JSON.parse(JSON.stringify(this.containerPoints))
  }

  startGameSetup(num) {
    this._modalService.open('couter-modal');
    if (this._totalChance === 10) {
      this.messageText = "Your Score is "+this._currentScore;
    }
    else {
      this.startCounter = num;
      this.messageText = "Your Game Starts in...!!";
      this.cdr.detectChanges();
      let intervalId = setInterval(() => {
        this.startCounter = this.startCounter - 1;
        console.log(this.startCounter)
        if (this.startCounter === 0) {
          clearInterval(intervalId)
          this.closeModal();
        }
      }, 2000)
    }

  }

  ngAfterViewInit() {

    this._d3Object = d3.select(".container-article-class")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .call(d3.zoom().on("zoom", () => {
        this._d3Object.attr("transform", d3.event.transform)
      }))
      .append("g")

    this._renderObject = this._d3Object.selectAll("rect")
      .data(this.containerPoints);

    this._renderObject.exit().remove();//remove unneeded circles                    
    this._renderObject.enter()
      .append("rect")
      .attr("x", (d) => { return d.x })
      .attr("y", (d) => { return d.y })
      .attr("fill", (d) => { return d.color })
      .attr("border", '1px solid white')
      .attr("width", '40px')
      .attr("height", '40px') // Get attributes from circleAttrs var
      .on("click", (d) => { this.selectedConatiner(d) });

    this.startGameSetup(5)
  }


  private _setData(): void {
    this._renderObject = this._d3Object.selectAll("rect")
      .data(this.containerPoints);

    this._renderObject.exit().remove();//remove unneeded circles                    
    this._renderObject.enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", '40px')
      .attr("height", '40px')
      .on("click", (d) => { this.selectedConatiner(d) }) // Get attributes from circleAttrs var

    this._renderObject.transition().duration(500)
      .attr("x", (d) => { return d.x })
      .attr("y", (d) => { return d.y })
      .attr("fill", (d) => { return d.color })
      .attr("border", '1px solid white');
  }

  private _setupConfiguration(): void {
    this._panelActionState.getGameColorActionUpdate().pipe(takeWhile(() => {
      return true;
    })).subscribe((state: ActionObject) => {
      this._stateObject = { ...state };
      if (this.containerPoints && state.action === '') {
        let randomIndex = Math.floor(Math.random() * this.containerPoints.length)
        let selectedItem = this.containerPoints[randomIndex];
        if (selectedItem) {
          ++this._totalChance;
          this._pckdColor = state.background;
          selectedItem.color = state.background;
          this.containerPoints[randomIndex] = selectedItem;
          this.containerPoints = this.containerPoints.slice(0);
          this._setData();

        }

      }
      else if (state.action === 'RESET') {
        this.startGameSetup(2);
        this.containerPoints = JSON.parse(JSON.stringify(this.orgContainerPoints))
        this._setData();
      }
    })
  }

  public closeModal(): void {
    this._modalService.close('couter-modal');
    if (this._totalChance === 10) {
      this._panelActionState.setGameColorActionUpdate({ ...this._stateObject, action: 'DONE' });
    }
    else {
      this._panelActionState.setGameColorActionUpdate({ ...this._stateObject, action: 'START' });
    }

  }

  public selectedConatiner(container: any): void {
    console.log('CONTAINER ', container,this._pckdColor === container.color);
    if (this._pckdColor === container.color) {
      ++this._currentScore;
    }
    this._panelActionState.setGameColorActionUpdate({ ...this._stateObject, action: 'SCORE', background: container.color });

  }
}
