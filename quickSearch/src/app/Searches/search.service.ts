import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

import { SearchResponse } from "./search.model";
import { ConsoleReporter } from "jasmine";

@Injectable({ providedIn: "root" })
export class SearchService {
  private searchResponses: SearchResponse[] = [];
  private searchResponsesUpdated = new Subject<SearchResponse[]>();

  constructor(private http: HttpClient) {}

  getSearchResponses(searchParams: any[]) {

    let params = new HttpParams();
    let keyName: string;
    searchParams.map(param => {
      keyName = Object.keys(param)[0];
      params = params.append(keyName, param[keyName])
    });

    return this.http.get<SearchResponse[]>("http://localhost:3000/api/searchResponse", {params});
  }

  getSearchResponsesUpdatedListener() {
    return this.searchResponsesUpdated.asObservable();
  }
}
