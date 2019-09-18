import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-fancy-component',
  templateUrl: './my-fancy-component.component.html',
  styleUrls: ['./my-fancy-component.component.css']
})
export class MyFancyComponentComponent implements OnInit {
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }


  public clickMe() {
    console.log('i was clicked');
  }
}
