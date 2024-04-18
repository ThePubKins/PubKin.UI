import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { jobpost, JobpostService, UserauthenticateService } from '../../shared';
import { map } from 'rxjs';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {
  form: any;
  Author = [{ AuthorsFirstName: '', AuthorsLastName: '', AuthorsEmail :'' }];
  currentDate: any = new Date();
  dateFormatted: any;
  maxCount = 1000;
  private _count = 0;
  count = 0;
  firstName: string;
  lastName: string;
  JobPost: any;
  uploadedFileName: string = ''; 
  selectedFiles: string[] = [];
  maxCharacters = 450;

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
  Posts : any;
  User : any;
  jobData : jobpost= {} as jobpost;
  selectedOption: string  = this.jobservice.jobData.complexity;

  ngOnInit(): void {
    this.getUserData();
    this.getAllPosts();
  }

  constructor(   public fb: FormBuilder,public datePipe: DatePipe,
    public jobservice:JobpostService,
    public userservice:UserauthenticateService) {
      this.calculateCharactersLeft();
  }

   //Submit to Job Post  Function
   onSubmitJob(form: NgForm) {
    if (this.jobservice.jobData) {
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

  getAllPosts() {
    return this.jobservice.getJobPost().pipe(
        map(data => data.length)
    );
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
      this.jobservice.jobData.skillSet = this.selectedSkills.join(', ');
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
      this.jobservice.jobData.service = this.selectedCardTitles.join(', ');
    } else {
      const titleIndex = this.selectedCardTitles.indexOf(this.cards[index].title);
      if (titleIndex !== -1) {
        this.selectedCardTitles.splice(titleIndex, 1);
      }
    }
  } 

  
  fetchdetails() { 
    this.getAllPosts().subscribe(totalPosts => {
        this.dateFormatted = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');
        this.jobservice.jobData.postDate = this.dateFormatted;
        this.jobservice.jobData.userEmail = this.User[0].email;
        this.jobservice.jobData.status = 'Open';
        this.jobservice.jobData.userId = this.User[0].id;
        this.jobservice.jobData.createdBy = `${this.User[0].firstName} ${this.User[0].lastName}`;
        this.firstName = (this.User[0].firstName || '').toUpperCase().slice(0, 1);
        this.lastName = (this.User[0].lastName || '').toUpperCase().slice(0, 2);
        this.jobservice.jobData.jobUniqueId = `A${this.firstName}${this.lastName} - ${totalPosts}`;
    });
}


 submitPostJob(form: NgForm) {
    if (this.jobservice.jobData) {
      const formData = new FormData();
      formData.append('dateCreated', this.jobservice.jobData.dateCreated);
      formData.append('createdBy', this.jobservice.jobData.createdBy);
      formData.append('id', this.jobservice.jobData.id);
      formData.append('jobUniqueId', this.jobservice.jobData.jobUniqueId);
      formData.append('userId', this.jobservice.jobData.userId);
      formData.append('jobTitle', this.jobservice.jobData.jobTitle);
      formData.append('description', this.jobservice.jobData.description);
      formData.append('skillSet', this.jobservice.jobData.skillSet);
      formData.append('complexity', this.jobservice.jobData.complexity);
      formData.append('projectStartDate', this.jobservice.jobData.projectStartDate);
      formData.append('experience', this.jobservice.jobData.experience);
      formData.append('rateBasis', this.jobservice.jobData.rateBasis);
      formData.append('fromBudget', this.jobservice.jobData.fromBudget);
      formData.append('toBudget', this.jobservice.jobData.toBudget);
      formData.append('currency', this.jobservice.jobData.currency);
      formData.append('userEmail', this.jobservice.jobData.userEmail);
      formData.append('service', this.jobservice.jobData.service);
      formData.append('attachUrl', this.jobservice.jobData.attachUrl);
      formData.append('fileName', this.jobservice.jobData.fileName);
      formData.append('status', this.jobservice.jobData.status);
  
      if (this.jobservice.jobData.attachFile) {
        formData.append('attachFile', this.jobservice.jobData.attachFile);
      }
  
      this.jobservice.postJobPost(form.value).subscribe(
        response => {
          console.log('Job posted successfully:', response);
          this.jobData = new this.JobPost();
        }
      );
    }
  }
  
  

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedFiles.push(selectedFile.name);
    this.jobservice.jobData.attachFile = selectedFile;
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.uploadedFileName = file ? file.name : ''; 
  }

  total :any;
  calculateTotal(): any {
    const num1 = parseInt(this.User[0].details || 0);
    const num2 = parseInt(this.User[0].govtIdDetails || 0);
    const num3 = parseInt(this.User[0].bankingDetails || 0);
    const total = num1 + num2 + num3;
  }


}

interface Card {  
  title: string;
  selected: boolean;
}