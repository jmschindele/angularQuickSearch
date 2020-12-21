import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { SearchResponse } from '../Models/search.model';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent implements OnInit {

  @Input() users: SearchResponse[]; 

  constructor() { }

  ngOnInit() {
  }

}
