import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { SearchResponse } from "../Searches/search.model";
import { Observable } from "rxjs";
import { SearchService } from "../Searches/search.service";

@Component({
  selector: "app-quick-search",
  templateUrl: "./quick-search.component.html",
  styleUrls: ["./quick-search.component.scss"]
})
export class QuickSearchComponent implements OnInit {
  users: SearchResponse[] = [];
  hasSearchResults: boolean = this.users.length > 1;

  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit() {}

  performSearch = e => {
    this.users = [];
    this.searchService.getSearchResponses()
    .subscribe(data => {
      data.map(self => {
        this.users.push(self);
      });
    });

  };
}

//admin
//rIugMeimT5pmj65B

