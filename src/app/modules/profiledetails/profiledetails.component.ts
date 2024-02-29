import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { BankDetailsService, EducationService, PaymentService, UserService, UserauthenticateService, WorkdetailsService } from '../../shared';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss']
})
export class ProfiledetailsComponent implements OnInit {

  contentName: string;
  selectedRate: string = 'Hourly';
  currentUser: Observable<any>;
  marchu = false;
  freelancers: any;
  authors: any;
  Freelancers: any[] = [
    { SimpleDesc: '', MediumDesc: '', ComplexDesc: '' } // Initialize as needed
  ];
  Freelancer: any;
  GoNext: string = "button1";
  selectedButton: string = "";
  progressValue: number = 25;
  selectedSkills: string[] = [];
  Author: any;
  chatTarget: any;
  maxCharacters = 50;
  inputText = '';
  charactersLeft: number;
  charactersLeft1: number;
  SkillSet: string = '';
  hidetext = false;
  User: any;
  workDetail: any;
  educationDetail: any;
  priceSkills: any;
  bankDetails: any;

  constructor(private route: ActivatedRoute,
    public userauthservice: UserauthenticateService,
    public userservice: UserService,
    public educationservice: EducationService,
    public workservice: WorkdetailsService,
    public priceService: PaymentService,
    public bankservice: BankDetailsService) {
    this.calculateCharactersLeft('SimpleDesc');
    this.calculateCharactersLeft('MediumDesc');
    this.calculateCharactersLeft('ComplexDesc');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contentName = params['contentName'];
    });
    this.getUserData(); this.getWorkingDetails(); this.getBankDetails();
    this.getEducationDetails(); this.getPaymentDetails();
  }

  @ViewChild('submitbutton') submitbutton: ElementRef;
  @ViewChild('idbutton') idbutton: ElementRef;
  @ViewChild('increasebutton') increasebutton: ElementRef;
  profilesubmit() {
    this.submitbutton.nativeElement.click();
  }
  govtsubmit() {
    this.idbutton.nativeElement.click();
  }

  //Work Submit to Post Function
  onSubmitWork(form: NgForm) {
    if (form.valid && this.workservice.formData) {
      this.workservice.postWorkDetails(form.value).subscribe();
    }
  }
  
  onSubmitpercentage(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.percentage(form.value).subscribe();
    }
  }

  increseGovtIdpercentage(){
    this.User[0].govtIdDetails ="Added";
  }

  increseWorkpercentage(){
    this.User[0].workingDetails = "Added";  
  }

  incresePortpercentage(){
    this.User[0].portfolioDetails = "Added";  
  }
  increseEducationpercentage(){
    this.User[0].educationDetails = "Added";  
  }

  incresedetailspercentage(){
    this.User[0].details = "Added";  
  }
  incresebankingpercentage(){
    this.User[0].bankingDetails = "Added";  
  }


  //Education Details Submit to Post Function
  onSubmitEducation(form: NgForm) {
    if (form.valid && this.educationservice.formData) {
      this.educationservice.postEducation(form.value).subscribe();
    }
  }


  //Pricing and Skillset Details Submit to Post Function
  onSubmitPrice(form: NgForm) {
    if (form.valid && this.priceService.SkillData) {
      this.priceService.postPricingSkill(form.value).subscribe();
    }
  }

  //Banking Details Submit to Post Function
  onSubmitBankDetails(form: NgForm) {
    if (form.valid && this.bankservice.bankformData) {
      this.bankservice.postBankDetails(form.value).subscribe();
    }
  }

  //GovtID Details Submit to Post Function
  onSubmitGovtIdDetails(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.postGovtDetails(form.value).subscribe();
    }
  }

  //Experience Details Submit to Post Function
  onSubmitExperienceDetails(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.postExperienceDetails(form.value).subscribe();
    }
  }

  //get the Current User Details
  getUserData() {
    const Email = this.userauthservice.getUserEmail() ?? sessionStorage.getItem('email');
    if (Email) {
      this.userauthservice.getUserData().subscribe({
        next: (data) => {
          this.User = data?.filter((User: any) => User.email === Email);
        },
      });
    } else {
    }
  }

  //Get the CurrentUser Working Details
  getWorkingDetails() {
    this.workservice.getWorkDetails().subscribe(data => {
      this.workDetail = data;
    })
  }

  //get the Current User Education details
  getEducationDetails() {
    this.educationservice.geteducation().subscribe(data => {
      this.educationDetail = data;
    })
  }

  //Get the Current User Payment details
  getPaymentDetails() {
    this.priceService.getPricingSkill().subscribe(data => {
      this.priceSkills = data;
    })
  }

  //Get the Current User Banking details
  getBankDetails() {
    this.bankservice.getBankDetails().subscribe(data => {
      this.bankDetails = data;
    })
  }

  hiddentext() {
    this.hidetext = true;
  }

  onButtonClick(buttonName: string): void {
    this.selectedButton = buttonName;
  }

  GoNextBtn(GoBtnName: string): void {
    this.GoNext = GoBtnName;
  }

  increaseProgress(): void {
    this.progressValue += 25;
    if (this.progressValue > 100) {
      this.progressValue = 100;
    }
  }

  hides1: any;
  Exp1() {
    this.hides1 = "Beginner";
  }

  Exp2() {
    this.hides1 = "Intermediate";
  }

  Exp3() {
    this.hides1 = "Expert";
  }


  skills = [
    'Lorem Ipsum 1',
    'Lorem Ipsum 2',
    'Lorem Ipsum 3',
    'Lorem Ipsum 4',
    'Lorem Ipsum 5',
    'Lorem Ipsum 6',
    'Lorem Ipsum 7',
    'Lorem Ipsum 8',
  ];

  addSkill(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      // this.services.formData.SkillSet = this.selectedSkills.join(', ');
    }
  }

  removeSkill(index: number): void {
    this.selectedSkills.splice(index, 1);
  }
  Rates: boolean = false

  hideRates() {
    this.Rates = true;
  }

  charactersLeftSimple: number = 0;
  charactersLeftMedium: number = 0;
  charactersLeftComplex: number = 0;

  onInputChange(textarea: string) {
    this.calculateCharactersLeft(textarea);
  }

  private calculateCharactersLeft(textarea: string) {
    switch (textarea) {
      case 'SimpleDesc':
        this.charactersLeftSimple = this.maxCharacters - this.Freelancers[0].SimpleDesc.length;
        break;
      case 'MediumDesc':
        this.charactersLeftMedium = this.maxCharacters - this.Freelancers[0].MediumDesc.length;
        break;
      case 'ComplexDesc':
        this.charactersLeftComplex = this.maxCharacters - this.Freelancers[0].ComplexDesc.length;
        break;
      default:
        break;
    }
  }

  isTextareaDisabled(textarea: string) {
    switch (textarea) {
      case 'SimpleDesc':
        return this.charactersLeftSimple < 0;
      case 'MediumDesc':
        return this.charactersLeftMedium < 0;
      case 'ComplexDesc':
        return this.charactersLeftComplex < 0;
      default:
        return false;
    }
  }

  getCharacterCountClass(textarea: string) {
    switch (textarea) {
      case 'SimpleDesc':
        return { 'character-limit-exceeded': this.isTextareaDisabled('SimpleDesc') };
      case 'MediumDesc':
        return { 'character-limit-exceeded': this.isTextareaDisabled('MediumDesc') };
      case 'ComplexDesc':
        return { 'character-limit-exceeded': this.isTextareaDisabled('ComplexDesc') };
      default:
        return {};
    }
  }
}
