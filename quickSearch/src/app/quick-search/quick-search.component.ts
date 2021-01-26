import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from "@angular/core";
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
  userScores: number[] = [];

  //Use to turn on and off relevance and shown filters
  @Input()
  debugmode: boolean = false;

  @Output()
  recentItemSelect: EventEmitter<any> = new EventEmitter();

  @Output()
  searchResultSelect: EventEmitter<any> = new EventEmitter();

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
    return this.http.get<RecentItem[]>("/arms/search/history").subscribe(res => {
      this.recentItems = res;
      this.showRecentItems = true;
    });
  }

  performSearch = () => {

    if (!this.hasTextContent) return;
    let params: any[] = [];
    params.push({queryText: this.queryText.trim()});
    if (this.activeFilter != null) params.push({entityType: this.activeFilter});

    this.searchService.getSearchResponses(params)
      .subscribe(res => {
        this.userScores = [];
        // this.maxScore = res.hits[0].score;
        // res.hits.map(user => this.userScores.push(user.score))
        // res.hits.map(user => user.shown = user.score > this.maxScore * 0.7);
        // this.users = res.hits.filter(user => user.score > this.calcStandardDeviation(this.userScores))
        this.users = res.hits;
        this.isSearching = false;
        this.showSearchResults = this.users.length > 0;
        this.showNoResultsFound = !this.showSearchResults;
      });
  };

  handleFilterClick = e => {

    e.preventDefault();
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

  resetValues = (clearText?: boolean) => {
    if (clearText) {
      this.queryText = null;
      this.activeFilter = null;
    }
    this.hasTextContent = false;
    this.isSearching = false;
    this.showRecentItems = false;
    this.showSearchResults = false;
    this.showNoResultsFound = false;
  }

  handleInput = e => {
    this.hasTextContent = e.target.value && e.target.value.trim().length > 0;
    if (!this.hasTextContent) {
      this.getRecentItems()
      return this.resetValues(true);
    }
    this.showRecentItems = !this.hasTextContent;
    this.queryText = e.target.value.trim();
    this.isSearching = this.queryText.length >= 2;
    if (this.isSearching) this.debounce(this.performSearch, 200);
  }

  handleKeyup = e => {
    if (e.which === 8) {
      if (e.target.value && e.target.value.trim().length) this.handleInput(e);
    }
  }

  handleClearInput = e => {
    // This has to be typecast to any to prevent the compiler from defaulting to HTMLElement
    // instead of HTMLInputElement
    var input: any = document.getElementById('global_search_input');
    input.value = "";
    this.resetValues(true);
  }

  handleInputFocus = e => {
    document.getElementById('quick-search-form').classList.add('form-focus');
    let input: any = document.getElementById('global_search_input');
    this.hasTextContent = input.value.trim().length;
    if (!this.hasTextContent) {
      this.getRecentItems();
    } else {
      this.queryText = input.value.trim();
      this.performSearch();
    }
  }

  handleBlur = e => {
    document.getElementById('quick-search-form').classList.remove('form-focus');
    //use a time out so the page is focused on the next element
    //also required so that other click handlers are not prevented
    setTimeout(()=> {
      if (document.activeElement.parentElement.parentElement == document.querySelector('.pop-out-container')) return;
      if (document.activeElement == document.querySelector('#global_search_input')) return;
      this.resetValues(false);
    }, 200)
  }

  debounce = (func, wait) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(func, wait);
  }

  handleResultClick = (e, url) => {
    this.searchResultSelect.emit(url);
    this.resetValues();
  }

  handleRecentItemClick = (e, url) => {
    this.recentItemSelect.emit(url);
    this.resetValues()
  }

  handleInputKeypress = e => {

    let listItems: any[] = this.getListItems();
    let index = this.getLiIndex(listItems) 

    switch(e.which){
      case 40: //down
        e.preventDefault();
        this.handleDownKey(listItems, index);
        break;
      case 38: //up
        e.preventDefault();
        this.handleUpKey(listItems, index) //up
        break;
      case 13 || 32: //space && enter
        this.handleSelect(e, listItems, index);
        break;
      case 27: //esc
        this.resetValues();
        break; 
      default:
        break;
    }
  }

  getListItems = () => Array.prototype.slice.call(document.querySelectorAll('li.container'));

  getLiIndex = arr => arr.indexOf(document.activeElement);

  handleDownKey = (arr: any[], i: number) => (i == -1 || i == arr.length - 1) ? arr[0].focus() : arr[i + 1].focus();
  
  handleUpKey = (arr: any[], i: number) => (i == -1 || i == 0) ? arr[arr.length -1].focus() : arr[i - 1].focus();

  handleSelect = (e, arr: any[], i: number) => { 
      if (i > -1) {
        e.preventDefault();
        arr[i].click();
      }
    return;
}

}

