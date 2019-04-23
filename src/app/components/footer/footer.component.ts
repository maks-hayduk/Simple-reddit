import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/shared/services/ShareData/share-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ifLoggined: boolean;
  showPost: boolean;
  constructor(private shareData: ShareDataService) { }

  ngOnInit() {
    this.shareData.currentMessage.subscribe(data => this.showPost = data);
    this.shareData.ifLoggined.subscribe(data => this.ifLoggined = data);
  }
  public createPostWindow(): void {
    this.shareData.changeMessage(true);
    this.shareData.changeLogin(false);
  }

}
