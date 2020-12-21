import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SearchResponse } from '../Models/search.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss']
})
export class QuickSearchComponent implements OnInit {
  
  users: SearchResponse[] = [];
  hasSearchResults: boolean = this.users.length > 1;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  performSearch = e => {

    if (e.target.value.length != 1) {
      this.getResults(e.target.value).subscribe(res => {
        this.users = [];
        res.map(i => {
          this.users.push(i);
        })
      });
    }

  }

  getResults(queryText: string): Observable<SearchResponse[]> {
    let params = new HttpParams().set("queryText", queryText);
    let headers = new HttpHeaders;

    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<SearchResponse[]>('http://www.searchUrl.com/',{headers, params})
  }

}
