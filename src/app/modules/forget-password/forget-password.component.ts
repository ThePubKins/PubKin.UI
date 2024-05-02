import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService, UserauthenticateService } from "../../shared";

declare var Email: any;

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"],
})
export class ForgetPasswordComponent implements OnInit {
  passshow: boolean = false;
  private generatedOTP: string = "";
  email: string;
  emails: any;

  constructor(private router: Router, public userservice: UserService) {}

  ngOnInit() {
    this.getemail();
  }

  pasword1() {
    this.passshow = !this.passshow;
  }

  //Email OTP & verify function
  sendOTP() {
    const email = document.getElementById("email") as HTMLInputElement;
    const otpverify = document.getElementsByClassName(
      "otpverify"
    )[0] as HTMLElement;
    this.generatedOTP = Math.floor(Math.random() * 10000).toString();
    let emailbody = `
      <h1>Your Pubkin Email verification</h1> <br>
      <h2>Your OTP is </h2><h2>${this.generatedOTP}</h2>
    `;
    Email.send({
      SecureToken: "9e3aa5bd-d384-4a3b-81d9-7eff7ad704a1",
      To: email.value,
      From: "sathishkmr.s4s@gmail.com",
      Subject: "This is the subject",
      Body: emailbody,
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
    const otp_inp = document.getElementById("otp_inp") as HTMLInputElement;
    if (otp_inp.value === this.generatedOTP) {
      this.router.navigate(["/setup-your-password-now"]);
    } else {
      alert("Invalid OTP");
    }
  }

  getemail() {
    this.userservice.getmail().subscribe((data) => {
      this.emails = data;
    });
  }

  get showError(): boolean {
    return !this.emails.includes(this.email);
  }

  get errorMessage(): string {
    return this.showError ? "Email doesn't match" : "";
  }
}
