import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  uri = 'https://api.github.com/user';
  userData: object;

  constructor(private http: HttpClient, private AuthService: TokenService) {}

  ngOnInit() {
    this.getAll();
  }

  /**
   * Get repos
   */
  getAll() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append(
      'Authorization',
      `Bearer ${this.AuthService.token}`
    );
    console.log(headers.get('Content-Type'));
    this.http
      .get(this.uri, { headers })
      .toPromise()
      .then(data => {
        this.userData = data;
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
