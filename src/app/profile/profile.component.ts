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
  userDatas: object;

  constructor(private http: HttpClient, private AuthService: TokenService) {}

  ngOnInit() {
    this.getAll();
  }

  /**
   * Get repos
   */
  getAll() {
    this.http
      .get(this.uri, { headers: this.AuthService.headerMaker() })
      .toPromise()
      .then(data => {
        this.userDatas = data;
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  modifyOneUserData(prop, value) {
    if (confirm('Are you sure?')) {
      const updateData = {};
      updateData[prop] = value;
      this.http
        .patch(this.uri, updateData, {
          headers: this.AuthService.headerMaker()
        })
        .toPromise()
        .then(data => {
          console.log(data);
          this.getAll();
          alert(`Your ${prop} sucessfully updated to ${value}!`);
        })
        .catch(err => {
          console.log(err);
          alert(`Unsuccessful update!`);
        });
    }
  }
}
