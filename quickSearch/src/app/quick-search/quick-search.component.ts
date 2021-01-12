import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, ɵCompiler_compileModuleSync__POST_R3__ } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SearchResponse, SearchResult } from "../Searches/search.model";
import { SearchService } from "../Searches/search.service";
import { RecentItem } from "../RecentItem/recentItem.model";


interface Filter  {
  name: String;
  icon: String;
  tipName: String;
}

@Component({
  selector: "quick-search",
  templateUrl: "./quick-search.component.html",
  styleUrls: ["./quick-search.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})

export class QuickSearchComponent implements OnInit {
  users: SearchResult[] = [];
  hasSearchResults: boolean = this.users.length > 1;
  hasTextContent: boolean = false;
  isSearching: boolean = false;
  activeFilter: string = null;
  queryText: string = null;
  timeout = null;
  recentItems: RecentItem[];
  showRecentItems: boolean = false;
  showSearchResults: boolean = false;
  showNoResultsFound: boolean = false;
  maxScore: number;
  cutOffScore: 2.5;
  userScores: number[] = [];

  //Use to turn on and off relevance and shown filters
  @Input()
  debugmode: boolean = false;

  @Output()
  recentItemSelect: EventEmitter<any> = new EventEmitter();

  @Output()
  searchResultSelect: EventEmitter<any> = new EventEmitter();

  // filters  = 
  // [
  //   {name: 'Recruit', icon: 'fal fa-crosshairs', tipName: 'Recruits'}, 
  //   {name:'StudentAthlete', icon:'fal fa-backpack', tipName: 'Student-Athletes'},
  //   {name: 'Contact', icon:'fal fa-address-card', tipName: 'Contacts'},
  //   {name: 'ArmsUser', icon:'fal fa-user-circle', tipName: 'ARMS Users'},
  //   {name: 'School', icon: 'fal fa-university', tipName:'Schools'},
  //   {name: 'ContactGroup', icon: 'fal fa-users', tipName: 'Contact Groups'},
  //   // {name: 'board', icon:'fas fa-object-group'},
  //   // {name: 'ArmsEvent', icon:'far fa-calendar'}
  // ];
  filters: Filter[];

  @Input()
  searchUrl: String;

  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit() {
    return this.http.get<Filter[]>("/arms/search/filters").subscribe(res => {
      this.filters = res;
    })
  }

  getRecentItems = () => {

    let params;

    if (this.activeFilter) {
    params = new HttpParams().set('entity', this.activeFilter);
    }

    return this.http.get<RecentItem[]>("/arms/search/history", {params}).subscribe(res => {
      this.recentItems = res;
      this.showRecentItems = true;
    });
  }

  calcStandardDeviation(arr: number[]) {
    let sumOfScores: number;
    let sumOfDeviations = 0;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    sumOfScores = arr.reduce(reducer, 0);
    arr.map(x => sumOfScores = sumOfScores + x);
    let mean = sumOfScores / arr.length;
    arr.map(x => sumOfDeviations += (x - mean)*(x - mean));
    let deviationMean = sumOfDeviations / arr.length;
    let standardDeviation = Math.sqrt(deviationMean);
    return standardDeviation;
  }

  performSearch = () => {

    let params: any[] = [];
    params.push({queryText: this.queryText});
    if (this.activeFilter != null) params.push({entity: this.activeFilter});
    if (!this.hasTextContent) return;

    this.searchService.getSearchResponses(params)
      .subscribe(res => {
        this.userScores = [];
        this.maxScore = res.hits[0].score;
        res.hits.map(user => this.userScores.push(user.score))
        // this.users = res.hits.filter(user => user.score > this.calcStandardDeviation(this.userScores))
        // res.hits.map(user => user.shown = user.score > this.calcStandardDeviation(this.userScores));
        res.hits.map(user => user.shown = user.score > this.maxScore * 0.7);
        // this.users = res.hits.filter(user => user.score > this.calcStandardDeviation(this.userScores))
        this.users = res.hits;
        this.isSearching = false;
        this.showSearchResults = this.users.length > 0;
        this.showNoResultsFound = !this.showSearchResults;
      });
  };

  handleFilterClick = e => {

    e.preventDefault();
    e.currentTarget.blur();
    this.unselectFilters();
    this.selectCurrentFilter(e);

  }

  unselectFilters = () => document.querySelectorAll('button.filter_toggle_button').forEach(el => {el.classList.remove('selected')});

  selectCurrentFilter = (e) => {
    let checkbox: any = e.currentTarget.querySelector('input');
    let selectedFilter = checkbox.id.split('_entity_filter')[0];
    document.getElementById(e.currentTarget.id).classList.add('selected');
    checkbox.checked = !checkbox.checked;
    this.activeFilter = selectedFilter === 'all' ? null : selectedFilter;
    this.hasTextContent ? this.performSearch() : this.getRecentItems();
  }

  resetValues = () => {
    this.isSearching = false;
    this.hasTextContent = false;
    this.activeFilter = null;
    this.showRecentItems = false;
    this.showSearchResults = false;
    this.showNoResultsFound = false;
  }

  handleInput = e => {
    this.hasTextContent = e.target.value.length > 0;
    if (!this.hasTextContent) {
      this.getRecentItems()
      return this.resetValues();
    }
    this.showRecentItems = !this.hasTextContent;
    this.queryText = e.target.value;
    this.isSearching = this.queryText.length >= 2;
    this.debounce(this.performSearch, 200);
  }

  handleClearInput = e => {
    // This has to be typecast to any to prevent the compiler from defaulting to HTMLElement
    // instead of HTMLInputElement
    var input: any = document.getElementById('global_search_input');
    input.value = "";
    this.resetValues();
  }

  handleInputFocus = e => {
    document.getElementById('quick-search-form').classList.add('form-focus');
    if (!this.hasTextContent) {
      this.getRecentItems();
    }
  }

  handleInputBlur = e => {
    document.getElementById('quick-search-form').classList.remove('form-focus');
    // if (this.showRecentItems) {
    //   this.resetValues();
    // }
  }

  debounce = (func, wait) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(func, wait);
  }

  handleResultClick = (e, url) => {
    this.searchResultSelect.emit(url);
  }

  handleRecentItemClick = (e, url) => {
    this.recentItemSelect.emit(url);
  }

handleShown = e => {
  console.log('shown')
}

}

