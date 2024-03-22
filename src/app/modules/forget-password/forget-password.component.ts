import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var Email:any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  passshow:boolean=false;
  private generatedOTP: string = '';

  constructor(private router: Router) { }

  pasword1(){
    this.passshow=!this.passshow;
  }


   //Email OTP & verify function
   sendOTP() {
    const email = document.getElementById('email') as HTMLInputElement;
    const otpverify = document.getElementsByClassName('otpverify')[0] as HTMLElement;
    this.generatedOTP = Math.floor(Math.random() * 10000).toString();
    let emailbody = `
      <h1>Your Pubkin Email verification</h1> <br>
      <h2>Your OTP is </h2><h2>${this.generatedOTP}</h2>
    `;
    Email.send({
      SecureToken: "99018773-29b0-46ef-ba19-195815ae6e52",
      To: email.value,
      From: "s4s.webui@gmail.com",
      Subject: "This is the subject",
      Body: emailbody
    }).then((message: string) => {
      if (message === "OK") {
        alert("OTP sent to your email " + email.value);
        otpverify.style.display = "block";
      }
    });
  }
  emailVerified: boolean = false;

  //verify the OTP
  verifyOTP() {
    const otp_inp = document.getElementById('otp_inp') as HTMLInputElement;
    if (otp_inp.value === this.generatedOTP) {
      this.router.navigate(['/setup-your-password-now']);

    } else {
      alert("Invalid OTP");
    }
  }

}
