import { Component, OnInit } from '@angular/core';
// import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showToggle: boolean;
  allDetails: any = {};
  menuToggle: Boolean = true;
  isCurrentRoute: Boolean = false;
  userName:any;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.getUserInfo();
    this.getSinglePage();
    this.callToggle();
  }

  onMenuToggle() {
    this.menuToggle = !this.menuToggle;
    this.callToggle();
  }

  isActiveUrl(url) {
    return ("/" + url == this.router.url) ? true : false;
  }

  getSinglePage() {
    this.appService.getSideMenu(resp => {
      this.allDetails = resp;
      for (let i = 0; i < this.allDetails.leftMenu.length; i++) {
        if (this.allDetails.leftMenu) {
          this.allDetails.leftMenu[i].showSubmenu = false;
        }
      }
    },
      err => {
      });
  }
  callToggle() {
    if (this.menuToggle) {
      document.querySelector('main').classList.add('togglemain');
    } else {
      document.querySelector('main').classList.remove('togglemain');
    }
  }

  itemSelected(item) {
    if (item.showSubmenu) {
      item.showSubmenu = false;
      return;
    }
    for (let i = 0; i < this.allDetails.leftMenu.length; i++) {
      this.allDetails.leftMenu[i].showSubmenu = false;
    }
    if (this.allDetails.leftMenu.indexOf(item) > -1) {
      item.showSubmenu = true;
    }
  }

  childSeleted(child) {
    for (let i = 0; i < this.allDetails.leftMenu.length; i++) {
      if (this.allDetails.leftMenu[i].child) {
        for (let j = 0; j < this.allDetails.leftMenu[i].child.length; j++) {
          this.allDetails.leftMenu[i].child[j].selected = false;
        }
        if (this.allDetails.leftMenu[i].child.indexOf(child) > -1) {
          child.selected = true;
        }
      }
    }
  }

  getUserInfo(){
    this.appService.getUserInfo(resp => {
      this.userName = resp.data.userName;
    }, error=>{
      
    })
  }

  onLogout(){
    window.location.href = 'https://etacdev.tatacommunications.com' + '/sso/logout';
  }

}
