import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-optionsview',
  templateUrl: './optionsview.component.html',
  styleUrls: ['./optionsview.component.css']
})
export class OptionsviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gameHandler(){
    this.router.navigate(['/gameboard']);
  }

  drawHandler(){
    this.router.navigate(['/drawboard']);
  }
}
