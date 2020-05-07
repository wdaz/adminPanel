import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private autService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout():void {
    this.autService.logout();
  }
}
