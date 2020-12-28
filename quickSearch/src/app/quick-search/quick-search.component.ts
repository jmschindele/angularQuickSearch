import { Component, Input, OnInit } from "@angular/core";
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
  styleUrls: ["./quick-search.component.scss"]
})
export class QuickSearchComponent implements OnInit {
  users: SearchResponse[] = [];
  hasSearchResults: boolean = this.users.length > 1;
  hasTextContent: boolean = false;
  isSearching: boolean = false;
  activeFilters: String[] = [];

  @Input()
  filters: Filter[] = [];

  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit() {}

  performSearch = e => {

    this.isSearching = true;
    this.hasTextContent = e.target.value.length > 0;
    if (this.hasTextContent && !this.activeFilters.length) {
      this.searchService.getSearchResponses()
      .subscribe(res => {
        this.users = res;
        this.isSearching = false;
      });
    } else if (this.hasTextContent && this.activeFilters.length) {

      //add query for parameterized search based on entities
    } else {
      this.users = [];
      this.isSearching = false;
    }

  };

  handleFilterClick = e => {
    e.preventDefault();
    let checkbox = e.currentTarget.querySelector('input');
    let selectedFilter = checkbox.id.split('_entity_filter')[0];

    checkbox.checked = !checkbox.checked;
    if (this.activeFilters.indexOf(selectedFilter) === -1) {
      this.activeFilters.push(selectedFilter)
    } else {
      this.activeFilters = this.activeFilters.filter(x => x != selectedFilter)
    }
  }

  handleClearInput = e => {
    console.log(document.querySelector('#global_search_input').textContent)
    document.querySelector('#global_search_input').innerHTML = '';
  }

}

