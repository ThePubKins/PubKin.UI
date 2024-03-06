import { Component, ElementRef, OnInit,OnDestroy, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService, UserService, UserauthenticateService } from '../../shared';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';
declare var Email: any;
declare var google: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  usercredential = { email: '', password: '', firstName: '', lastName: '', role: '' };
  email: string = '';
  isSignUp: boolean = true;
  displayName: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  action: any;
  otpInput: string = '';
  isOtpSent: boolean = false;
  private generatedOTP: string = '';
  googleBtn: HTMLElement | null = null;
  auth = inject(UserauthenticateService);
  checked = false;
  indeterminate = false;
  selectedButton: string = "button1";
  GoNext: string = "button1";
  otppopup = false;
  googledown: boolean;
  selectedRole: string;
  verify: boolean = false;
  errorMessage: string = '';
  emails: any;
  userEmail: string = '';
  userName: string = '';
  constructor(public authService: SocialAuthService,public dialog: MatDialog, private route: ActivatedRoute, public userservice: UserService, public roleService: RoleService,
    public userregister: UserauthenticateService, private router: Router) { }
    authSubscription!: Subscription;
  @ViewChild('rolebutton') rolebutton: ElementRef;
  @ViewChild('submitbutton') submitbutton: ElementRef;
  @ViewChild('firebutton') firebutton: ElementRef;
  @ViewChild('loginbutton') loginbutton: ElementRef;

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
  hide1: boolean = true;
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hide1 = !this.hide1;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.hide1 ? 'password' : 'text';
    }
  }
  togglePasswordVisibility1(): void {
    this.hidePassword = !this.hidePassword; 
  }
  getVisibilityIcon(): string {
    return this.hide1 ? 'visibility_off' : 'visibility';
  }

  fireSignupButton() {
    this.firebutton.nativeElement.click();
  }

  verfy() {
    this.verify = true;
  }
  roleButton() {
    this.rolebutton.nativeElement.click();
  }
  getemail() {
    this.userservice.getmail().subscribe(data => {
      this.emails = data;
    });
  }
  role() {
    this.usercredential.role = this.selectedRole;
    this.roleService.roleData.roleName = this.selectedRole;
  }

  // loginButton() {
  //   this.loginbutton.nativeElement.click();
  // }
  //   loginButton() {
  //     const loginFailed = true;
  //     if (loginFailed) {
  //         this.errorMessage = 'Incorrect email or password.';
  //     } else {
  //         this.errorMessage = '';
  //     }
  //     this.loginbutton.nativeElement.click();
  // }

  loginButton() {
    const loginFailed = true;
    if (loginFailed) {
      this.errorMessage = 'Incorrect email or password.';
    } else {
      this.errorMessage = '';
    }
    if (loginFailed) {
      this.loginbutton.nativeElement.click();
    }
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;
  }

  //Submit to the Role
  onSubmitRole(form: NgForm) {
    if (form.valid && this.roleService.roleData) {
      this.roleService.postRole(form.value).subscribe();
    }
  }


  //UserLogin function
  Userlogin(): void {
    if (this.email && this.password) {
      this.userregister.login(this.email, this.password).subscribe({
        next: (response) => {
          this.userregister.setToken(response.token);
          this.router.navigate(['/role']);
        },
      }
      );
    }
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
      this.GoNext = 'button5';
      setTimeout(() => {
        this.router.navigate(['/role']);
    }, 3000);
    } else {
      alert("Invalid OTP");
    }
  }


  //User Register and MySql Database Functionality
  UserRegister(form: NgForm, usercredential: { firstName: string, lastName: string, email: string, password: string, role: string }): void {
    if (usercredential.email && usercredential.password) {
      this.userregister.userregister(
        usercredential.firstName, usercredential.lastName, usercredential.email, usercredential.password, usercredential.role).subscribe({
          next: (response) => {
            this.userregister.setToken = response.Token;
          },
          error: (err) => {
            if (err.status === 409) {
              form.controls['email'].setErrors({ 'emailExists': true });
            } else {
              console.error('Registration failed:', err);
            }
          },
        });
    }
  }


  onButtonClick(): void {
    this.GoNext = this.selectedButton;
  }


  GoNextBtn(button: string): void {
    this.GoNext = button;
  }


  googlehide() {
    this.googledown = true;
  }

  popuphide() {
    this.otppopup = true;
    setTimeout(() => {
      this.otppopup = false;
    }, 3000);
  }
  //Google signup
  ngOnInit(): void {
    this.getemail();
    this.action = this.route.snapshot.paramMap.get('action');
    this.authSubscription = this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.userName = user.name;
    });
  }

  onGoogleSignupClick() {
    google.accounts.id.prompt();
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
    }
  }
  checkbox1: boolean = false;
  checkbox2: boolean = false;

  toggleCheckboxes(): void {
    if (this.checkbox2) {
      this.checkbox1 = true;
    } else {
      this.checkbox1 = false;
    }
  }

  //Role Include the input
  freelancerrole() {
    this.usercredential.role = 'freelancer';
    this.roleService.roleData.roleName = 'freelancer';
  }

  authorrole() {
    this.usercredential.role = 'author';
    this.roleService.roleData.roleName = 'author';
  }
}
