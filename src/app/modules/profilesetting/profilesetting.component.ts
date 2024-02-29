import { Component } from '@angular/core';

@Component({
  selector: 'app-profilesetting',
  templateUrl: './profilesetting.component.html',
  styleUrls: ['./profilesetting.component.scss']
})
export class ProfilesettingComponent {
  selectedButton: string  = "button1";

  onButtonClick(buttonName: string): void {
    this.selectedButton = buttonName;
  }

}
