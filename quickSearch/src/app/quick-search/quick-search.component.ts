import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { SearchResponse } from "../Searches/search.model";
import { SearchService } from "../Searches/search.service";


class Filter  {
  type: String;
  icon: String;

  constructor(type: String, icon: String) {
    this.type = type;
    this.icon = icon;
  }
}


@Component({
  selector: "app-quick-search",
  templateUrl: "./quick-search.component.html",
  styleUrls: ["./quick-search.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
})

export class QuickSearchComponent implements OnInit {
  users: SearchResponse[] = [];
  hasSearchResults: boolean = this.users.length > 1;
  hasTextContent: boolean = false;
  isSearching: boolean = false;
  activeFilters: String[] = [];

  @Input()
  filters  = 
  [
    {name: 'Recruits', icon: 'user-circle'}, 
    {name:'Student-Athletes', icon:'user'},
    {name: 'Contacts', icon:'address-book'},
    {name: 'ARMS Users', icon:'user-secret'},
    {name: 'Schools', icon: 'university'},
    {name: 'Groups', icon: 'users'},
    {name: 'Boards', icon:'object-group'},
    {name: 'Events', icon:'calendar'}
  ];

  @Input()
  searchUrl: String;

  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit() {}

  performSearch = e => {

    this.isSearching = true;
    this.hasTextContent = e.target.value.length > 0;
    let params: any[] = [];

    let queryText = {
      queryText: e.target.value
    };

    // params.push(queryText);

    if (this.activeFilters.length) {
      let entitiesFilters = {
        entities: this.activeFilters
      };
      params.push(entitiesFilters);
    }

    if (this.hasTextContent) {
      this.searchService.getSearchResponses(params)
      .subscribe(res => {
        this.users = res;
        this.isSearching = false;
      });
    }  else {
      this.users = [];
      this.isSearching = false;
    }

  };

  handleFilterClick = e => {

    e.preventDefault();

    let checkbox = e.currentTarget.querySelector('input');
    let selectedFilter = checkbox.id.split('_entity_filter')[0];

    document.getElementById(e.currentTarget.id).classList.toggle('selected');
    checkbox.checked = !checkbox.checked;

    if (this.activeFilters.indexOf(selectedFilter) === -1) {
      this.activeFilters.push(selectedFilter)
    } else {
      this.activeFilters = this.activeFilters.filter(x => x != selectedFilter)
    }
  }

  handleClearInput = e => {
    // document.findElementById('global_search_input').value = '';
  }

}

