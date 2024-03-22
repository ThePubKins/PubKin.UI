import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { BankDetailsService, EducationService, PortfolioService, UserService, UserauthenticateService, WorkdetailsService, portfolio, PricingSkillService } from '../../shared';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss']
})
export class ProfiledetailsComponent implements OnInit {
[x: string]: any;
  contentName: string;
  selectedRate: string = 'Hourly';
  currentUser: Observable<any>;
  marchu = false;
  freelancers: any;
  authors: any;
  Freelancers: any[] = [
    { SimpleDesc: '', MediumDesc: '', ComplexDesc: '' }
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
  //new
  User: any;
  workDetail: any;
  educationDetail: any;
  priceSkills: any;
  bankDetails: any;
  portfolios: any
  uploadedFileName: string = '';
  selectedFiles: string[] = [];
  combinedSkills: string[] = [];
  dateFormatted: any;
  hideprofileclose: boolean = false;
  currentDate: any = new Date();

  constructor(private route: ActivatedRoute,
    public userauthservice: UserauthenticateService,
    public userservice: UserService,
    public portfolioService: PortfolioService,
    public educationservice: EducationService,
    public workservice: WorkdetailsService,
    public datePipe: DatePipe,
    public router: Router,
    public priceService: PricingSkillService,
    public bankservice: BankDetailsService) {
    this.calculateCharactersLeft('SimpleDesc');
    this.calculateCharactersLeft('MediumDesc');
    this.calculateCharactersLeft('ComplexDesc');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contentName = params['contentName'];
    });
    this.getUserData(); this.getWorkingDetails(); this.getBankDetails(); this.updateCombinedSkills();
    this.getEducationDetails(); this.getPaymentDetails(); this.getPortfolioDetails();
  }

  @ViewChild('submitbutton') submitbutton: ElementRef;
  @ViewChild('idbutton') idbutton: ElementRef;
  @ViewChild('increasebutton') increasebutton: ElementRef;
  @ViewChild('percentagebutton') percentagebutton: ElementRef;

  profilesubmit() {
    this.submitbutton.nativeElement.click();
  }

  govtsubmit() {
    this.idbutton.nativeElement.click();
  }

  PercentageSubmit() {
    this.percentagebutton.nativeElement.click();
  }

  //Avatar for profile
  images = [
    { img_url: '/assets/animoji.png' },
    { img_url: '/assets/animoji-13.png' },
    { img_url: '/assets/animoji-14.png' },
    { img_url: '/assets/animoji-15.png' },
    { img_url: '/assets/animoji-16.png' },
    { img_url: '/assets/animoji-19.png' },
    { img_url: '/assets/animoji-20.png' },
    { img_url: '/assets/animoji-21.png' },
    { img_url: '/assets/animoji-22.png' },
    { img_url: '/assets/animoji-23.png' },
    { img_url: '/assets/animoji-24.png' },
    { img_url: '/assets/animoji-25.png' },
    { img_url: '/assets/animoji-1.png' },
    { img_url: '/assets/animoji-2.png' },
    { img_url: '/assets/animoji-3.png' },
    { img_url: '/assets/animoji-4.png' },
    { img_url: '/assets/animoji-5.png' },
    { img_url: '/assets/animoji-6.png' },
    { img_url: '/assets/animoji-9.png' },
    { img_url: '/assets/animoji-10.png' },
    { img_url: '/assets/animoji-11.png' },
    { img_url: '/assets/animoji-12.png' },
    { img_url: '/assets/animoji-17.png' },
    { img_url: '/assets/animoji-18.png' }
  ]

  @ViewChild('firstButton') firstButton: ElementRef;


  closeProfile() {
      this.firstButton.nativeElement.click();
      if(this.User[0].role === 'freelancer'){
        this.router.navigate(['/freelancers']);
      }
      if(this.User[0].role === 'author'){
        this.router.navigate(['/authors']);
      }
  }

  selectedImage: string;

  selectImage(image: any) {
    this.selectedImage = image.img_url;
  }

  selectedImage2: string;
  saveChanges() {
    this.selectedImage2 = this.selectedImage
    this.userservice.userData.profileUrl = this.selectedImage2;

  }

  //Work Submit to Post Function
  onSubmitWork(form: NgForm) {
    if (form.valid && this.workservice.workData) {
      this.workservice.postWorkDetails(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'employment-history';
          window.location.reload();
          }
      }, 1500);
    }
  }

  //Education Details Submit to Post Function
  onSubmitEducation(form: NgForm) {
    if (form.valid && this.educationservice.educationData) {
      this.educationservice.postEducation(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'education-details';
          window.location.reload();
          }
      }, 1500);
    }
  }

  //PortFolio Details Submit to Post Function
  onSubmitPortfolio(form: NgForm) {
    if (form.valid && this.portfolioService.portfolioFormData) {
      this.portfolioService.postPortfolios(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'portfolio';
          window.location.reload();
          }
      }, 1500);
    }
  }

  FetchDetails() {
    this.portfolioService.portfolioFormData.userId = this.User[0].id;
    this.portfolioService.portfolioFormData.createdBy = this.User[0].firstName;
  }

  //Pricing and Skillset Details Submit to Post Function
  onSubmitPrice(form: NgForm) {
    if (form.valid && this.priceService.pricingSkillData) {
      this.priceService.postSkillPricing(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'payment';
          window.location.reload();
          }
      }, 1500);
    }
  }

  // Profile Percentage Submit to Post Function
  onSubmitpercentage(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.putProfilePercentage(form.value).subscribe();
    }
  }

  //FreelancersWorkPercentage
  increaseWorkingPercentage() {
    this.User[0].workingDetails = "15";
  }

  //FreelancersPortfolioPercentage
  incresePortfolioPercentage() {
    this.User[0].portfolioDetails = "15";
  }

   //FreelancersEducationPercentage
  increseEducationPercentage() {
    this.User[0].educationDetails = "15";
  }

  //FreelancersFreelancingPercentage
  increseFreelancingPercentage() {
    this.User[0].details = "15";
  }

   //FreelancersPricingSkillPercentage
   incresePricingSkillPercentage() {
    this.User[0].bankingDetails = "20";
  }

     //FreelancersPricingSkillPercentage
     increseGovtDetailsPercentage() {
      this.User[0].govtIdDetails = "20";
    }

  //AuthorsDetailsPercentage
  increseDetailsPercentage() {
    this.User[0].details = "30";
  }

  //AuthorsBankDetailsPercentage
  increseBankPercentage() {
    this.User[0].bankingDetails = "35";
    this.User[0].paymentVerify = "Added";
  }

  //AuthorsGovtIdPercentage
  increaseGovtPercentage() {
    this.User[0].govtIdDetails = "35";
  }

  //Banking Details Submit to Post Function
  onSubmitBankDetails(form: NgForm) {
    if (form.valid && this.bankservice.bankData) {
      this.bankservice.postBankDetails(form.value).subscribe();
    }
  }

  onSubmitBankingDetails(form: NgForm) {
    if (form.valid && this.bankservice.bankData) {
      this.bankservice.putBankDetails(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'banking-details';
          window.location.reload();
          }
      }, 1500);
    }
  }

  onSubmitCardDetails(form: NgForm) {
    if (form.valid && this.bankservice.bankData) {
      this.bankservice.putCardDetails(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'banking-details';
          window.location.reload();
          }
      }, 1500);
    }
  }

  onSubmitUpiDetails(form: NgForm) {
    if (form.valid && this.bankservice.bankData) {
      this.bankservice.putUpiDetails(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'banking-details';
          window.location.reload();
          }
      }, 1500);
    }
  }

  //GovtID Details Submit to Post Function
  onSubmitGovtIdDetails(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.putGovtDetails(form.value).subscribe();
    }
  }

  //Profile  Details Submit to Post Function
  onSubmitProfile(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.putProfile(form.value).subscribe();
    }
  }

  //PersonalData Details Submit to Post Function
  onSubmitPersonal(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.putPersonalData(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'author-profile';
          window.location.reload();
          }
      }, 1500);
    }
  }

  //Experience Details Submit to Post Function
  onSubmitExperienceDetails(form: NgForm) {
    if (form.valid && this.userservice.userData) {
      this.userservice.putFreelancingDetails(form.value).subscribe();
      this.contentName = 'whoopee';
      setTimeout(() => {
        if (this.contentName === 'whoopee') {
          this.contentName = 'freelancing-details';
          window.location.reload();
          }
      }, 1500);
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

  //get the Current User Portfolio details
  getPortfolioDetails() {
    this.portfolioService.getPortfolios().subscribe(data => {
      this.portfolios = data;
    })
  }

  //Get the Current User Payment details
  getPaymentDetails() {
    this.priceService.getSkillPricing().subscribe(data => {
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

  Exp1() {
    this.User[0].experience = "Beginner";
  }

  Exp2() {
    this.User[0].experience = "Intermediate";
  }

  Exp3() {
    this.User[0].experience = "Expert";
  }
  selectedOption: string = '1'; // Default selection

  // Make sure to include FormsModule in your module imports array.
  
  // If you want to handle changes on dropdown selection:
  onSelectionChange(event: Event) {
    // You can handle the selection change event h


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

  updateCombinedSkills(): void {
    this.combinedSkills = [...this.selectedSkills, ...this.skills];
  }


  toggleSkill(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);
    if (index !== -1) {
      this.selectedSkills.splice(index, 1);
    } else {
      this.selectedSkills.push(skill);
    }
    this.updateCombinedSkills();
  }


  addSkill(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
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


  accordionItems = [
    { title: 'Section 1', content: 'Content for Section 1 goes here.', active: false },
    { title: 'Section 2', content: 'Content for Section 2 goes here.', active: false },
    // Add more sections as needed
  ];

  // Extend the list of years
  years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, ]; 
  selectedYear1: number | null;
  selectedYear2: number | null;


  updateSelectedYears(dropdown: string) {
    // Check if the selected years are the same and handle accordingly
    if (dropdown === 'year1' && this.selectedYear1 === this.selectedYear2) {
      // Handle the case when the selected years in Section 1 and Section 2 are the same
      this.selectedYear1 = null;
      alert("Please select different years in Section 1 and Section 2.");
    } else if (dropdown === 'year2' && this.selectedYear1 === this.selectedYear2) {
      // Handle the case when the selected years in Section 1 and Section 2 are the same
      this.selectedYear2 = null;
      alert("Please select different years in Section 1 and Section 2.");
    }
  }

  // Return the list of years excluding the already selected year in Section 1
  getAvailableYears(): number[] {
    if (this.selectedYear1 !== null && this.selectedYear1 !== undefined) {
      // If a starting year is selected, exclude that year and the years before it
      return this.years.filter(year => year > this.selectedYear1!);
    } else {
      return this.years;
    }
  }


}