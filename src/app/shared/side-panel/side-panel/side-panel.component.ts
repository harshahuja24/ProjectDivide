import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {
  isCollapsed = false;

  isAdmin: boolean = JSON.parse(localStorage.getItem('isAdmin') || 'false');
  loggedInUserId: boolean = Number(localStorage.getItem('loggedInUserId') || '0')  == 0 ? false : true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(public router: Router) {}
}
