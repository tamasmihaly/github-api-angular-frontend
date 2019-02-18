import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private AuthService: TokenService, private http: HttpClient) {}
  token = '';
  uri = 'https://api.github.com/user';
  username = '';
  ngOnInit() {
    this.getName();
  }

  saveToken() {
    this.AuthService.token = this.token;
    this.getName();
  }
  getName() {
    this.http
      .get(this.uri, { headers: this.AuthService.headerMaker() })
      .toPromise()
      .then(data => {
        this.username = data['login'];
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.username = '';
      });
  }
}
