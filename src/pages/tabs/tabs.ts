import { Component } from '@angular/core';

import { StatusPage } from '../status/status';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StatusPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
