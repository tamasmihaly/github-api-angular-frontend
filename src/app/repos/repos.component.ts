import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  uri = 'https://api.github.com/user/repos';
  repos: any = [];
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
        this.repos = data;
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', item);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}
