import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  provinces: Array<any> = [];

  constructor(
    private locationService: LocationService;
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  logOut() {
    this.router.navigate(['/login']);

  }
}
