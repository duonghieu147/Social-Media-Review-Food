import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-silderbar-left',
  templateUrl: './silderbar-left.component.html',
  styleUrls: ['./silderbar-left.component.css']
})
export class SilderbarLeftComponent implements OnInit {
  isCollapsed = false;
  urlProfile = '/profile/' + localStorage.getItem('id')
  constructor() { }

  ngOnInit(): void {
  }
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  selectedNavItem: string = '';

  navClick(navId: any) {
    this.selectedNavItem = navId;
  }

}
