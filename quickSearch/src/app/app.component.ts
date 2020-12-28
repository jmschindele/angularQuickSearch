import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quickSearch';

  filters = [
    {name: 'Recruits', icon: 'user-circle'}, 
    {name:'Student-Athletes', icon:'user'},
    {name: 'Contacts', icon:'address-book'},
    {name: 'ARMS Users', icon:'user-secret'},
    {name: 'Schools', icon: 'university'},
    {name: 'Groups', icon: 'users'},
    {name: 'Boards', icon:'object-group'},
    {name: 'Events', icon:'calendar'}
  ];
}


