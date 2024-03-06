import { Component, EventEmitter, Output } from '@angular/core';
declare global {
  interface Window {
    google: any;
  }
}
@Component({
  selector: 'app-googlesignin',
  templateUrl: './googlesignin.component.html',
  styleUrls: ['./googlesignin.component.scss']
})
export class GooglesigninComponent{
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  createFakeGoogleWrapper = () => {
    const googleLoginWrapper = document.createElement('div');
    googleLoginWrapper.style.display = 'none';
    googleLoginWrapper.classList.add('custom-google-button');
    document.body.appendChild(googleLoginWrapper);
    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type:'standard',
      shape:'pill',
      theme:'filled_blue',
      text:'signin_with',
      size:'medium',
    });

    const googleLoginWrapperButton = googleLoginWrapper.querySelector(
      'div[role=button]'
    ) as HTMLElement;

    return {
      click: () => {
        googleLoginWrapperButton?.click();
      },
    };
  };

  handleGoogleLogin() {
    this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
  }

}

