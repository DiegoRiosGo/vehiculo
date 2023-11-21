import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ask-email',
  templateUrl: './ask-email.page.html',
  styleUrls: ['./ask-email.page.scss'],
})
export class AskEmailPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  
}
