import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { SearchResponse } from "./search.model";

@Injectable({ providedIn: "root" })
export class SearchService {
  private searchResponses: SearchResponse[] = [];
  private searchResponsesUpdated = new Subject<SearchResponse[]>();

  constructor(private http: HttpClient) {}

  getSearchResponses() {
    return this.http.get<SearchResponse[]>("http://localhost:3000/api/searchResponse");
    //   .subscribe(data => {
    //     this.searchResponses = data;
    //     console.log(data);
    //     this.searchResponsesUpdated.next(data);
    //   });
  }

  getSearchResponsesUpdatedListener() {
    return this.searchResponsesUpdated.asObservable();
  }
}
