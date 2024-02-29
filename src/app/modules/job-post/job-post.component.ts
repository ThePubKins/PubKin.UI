import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { JobpostService } from '../Service/jobpost.service';
import { UserauthenticateService } from '../Service/userauthenticate.service';
import { JobPost } from '../Service/jobpost.model';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  form: any;
  Author = [{ AuthorsFirstName: '', AuthorsLastName: '', AuthorsEmail :'' }];
  currentDate: any = new Date();
  maxCount = 1000;
  private _count = 0;
  count = 0;
  firstName: string;
  lastName: string;
  JobPost: any;
  uploadedFileName: string = ''; 
  selectedFiles: string[] = [];
  maxCharacters = 450;
  dateFormatted: any;
  inputText = '';
  charactersLeft: number;
  complex = false;
  complex1 = false;
  complex2 = false;
  complex3 = false;
  hide2 = false;
  skillset: string | null = null;
  selectedSkills: string[] = [];
  end: string | null = null;
  selectedRate: string = 'Hourly';
  Rate: string = 'INR';
  User = [{ firstName: '', lastName: '', email :'', userId: '' }];
  jobpostingData = new JobPost();
  selectedOption: string  = this.jobpostingData.complexity;
  ngOnInit(): void {
    this.getUserData();
  }

  constructor(   public fb: FormBuilder,public datePipe: DatePipe,
    public jobservice:JobpostService,
    public userservice:UserauthenticateService ) {
      this.calculateCharactersLeft();
  }

   //Submit to Job Post  Function
   onSubmitJob(form: NgForm) {
    if (form.valid && this.jobpostingData) {
      this.jobservice.postJobPost(form.value).subscribe();
    }
  }

  //Character Left for the description
  onInputChange() {
    this.calculateCharactersLeft();
  }

  private calculateCharactersLeft() {
    this.charactersLeft = this.maxCharacters - this.inputText.length;
  }

  isTextareaDisabled() {
    return this.charactersLeft < 0;
  }

  getCharacterCountClass() {
    return { 'character-limit-exceeded': this.isTextareaDisabled() };
  }

  //get current user Data
   getUserData() {
    const email = this.userservice.getUserEmail() ?? sessionStorage.getItem('email');
    console.log(email, "email")
    if (email) {
      this.userservice.getUserData().subscribe({
        next: (data) => {
          this.User = data?.filter((author: any) => author.email === email);
        },
      });
    } else {
    }
  }

  GoNext: string = "button1";
  GoNextBtn(GoBtnName: string): void {
    this.GoNext = GoBtnName;
  }

  hideclick() {
    this.complex = !this.complex;
  }

  hideclick23() {
    this.complex2 = !this.complex2;
  }

  hideclick13() {
    this.complex3 = !this.complex3;
  }

  hideclick231() {
    this.skillset = "Beginner";
  }

  hideclick232() {
    this.skillset = "Intermediate";
  }

  hideclick233() {
    this.skillset = "Expert";
  }

  hide() {
    this.complex1 = !this.complex1;
  }

  hide1() {
    this.hide2 = !this.hide2;
  }

  hideclick1() {
    this.selectedOption = "Simple"
  }

  hideclick2() {
    this.selectedOption = "Medium"
  }

  hideclick3() {
    this.selectedOption = "Complex"
  }

  @ViewChild('firstButton') firstButton: ElementRef;
  yesaakuraen = true;
  bye() {
    this.yesaakuraen = !this.yesaakuraen;
  }
  goodbye() {
    this.firstButton.nativeElement.click();
  }

  skills = [
    'Compositor',
    'Graphics Artist',
    'Template Design',
    'Cover Designer',
    'Copy Editor',
    'Language Editor',
    'Content Writers',
    'Quality Controller',
    'Quality Assurance',
    'eBook Developer',
    'Quality Assurance',
    'eBook Developer',
    'XML Specialist'
  ];

  addSkill(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.jobpostingData.skillSet = this.selectedSkills.join(', ');
    }
  }

  removeSkill(index: number): void {
    this.selectedSkills.splice(index, 1);
  }


  cards: Card[] = [
    { title: 'Book Typesetting', selected: false },
    { title: 'Template Designing', selected: false },
    { title: 'Cover', selected: false },
    { title: 'Illustrator Works', selected: false },
    { title: 'Graphics', selected: false },
    { title: 'Journal Typesetting', selected: false },
    { title: 'Boucher Typesetting', selected: false },
    { title: 'Flyers Typesetting', selected: false },
    { title: 'Publishing Support', selected: false },
    { title: 'Copywrite registration', selected: false },
    { title: 'Marketing & Promotion', selected: false }
  ];

  selectedCardTitles: string[] = [];

  toggleSelection(index: number): void {
    this.cards[index].selected = !this.cards[index].selected;

    if (this.cards[index].selected) {
      this.selectedCardTitles.push(this.cards[index].title);
      this.jobpostingData.service = this.selectedCardTitles.join(', ');
    } else {
      const titleIndex = this.selectedCardTitles.indexOf(this.cards[index].title);
      if (titleIndex !== -1) {
        this.selectedCardTitles.splice(titleIndex, 1);
      }
    }
  } 

  fetchdetails() { 
    this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');  
    this.jobpostingData.createDate = this.dateFormatted;
    this.jobpostingData.userEmail= this.User[0].email;
    this.jobpostingData.userId= this.User[0].userId;
    this.jobpostingData.createdBy = `${this.User[0].firstName} ${this.User[0].lastName}`;
    this.firstName = (this.User[0].firstName || '').toUpperCase().slice(0, 1);
    this.lastName = (this.User[0].lastName || '').toUpperCase().slice(0, 2);
    this.jobpostingData.jobUniqueId = `A${this.firstName}${this.lastName} - ${this._count}`
  }
  submitForm() {
    const formData = new FormData();
    formData.append('CreateDate', this.jobpostingData.createDate);
    formData.append('createdBy', this.jobpostingData.createdBy);
    formData.append('jobId', this.jobpostingData.jobId);
    formData.append('jobUniqueId', this.jobpostingData.jobUniqueId);
    formData.append('userId', this.jobpostingData.userId);
    formData.append('jobTitle', this.jobpostingData.jobTitle);
    formData.append('description', this.jobpostingData.description);
    formData.append('skillSet', this.jobpostingData.skillSet);
    formData.append('complexity', this.jobpostingData.complexity);
    formData.append('projectStartDate', this.jobpostingData.projectStartDate);
    formData.append('experience', this.jobpostingData.experience);
    formData.append('rateBasis', this.jobpostingData.rateBasis);
    formData.append('fromBudget', this.jobpostingData.fromBudget);
    formData.append('toBudget', this.jobpostingData.toBudget);
    formData.append('currency', this.jobpostingData.currency);
    formData.append('userEmail', this.jobpostingData.userEmail);
    formData.append('service', this.jobpostingData.service);
    formData.append('attachUrl', this.jobpostingData.attachUrl);

    if (this.jobpostingData.attachFile) {
      formData.append('attachFile', this.jobpostingData.attachFile);
    }

    this.jobservice.postJobPost(formData).subscribe(
      response => {
        console.log('Comment added successfully:', response);
        this.jobpostingData = new JobPost();
      },
      error => {
        console.error('Error adding comment:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedFiles.push(selectedFile.name);
    this.jobpostingData.attachFile=selectedFile;
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.uploadedFileName = file ? file.name : ''; 
  }
  
}

interface Card {
  title: string;
  selected: boolean;
}