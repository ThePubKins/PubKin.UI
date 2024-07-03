import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { jobpost, JobpostService, UserauthenticateService } from '../../shared';
import { map } from 'rxjs';
import { Router } from '@angular/router';

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
  success: boolean = true;
  selectedOption: string  = this.jobservice.jobData.complexity;

  ngOnInit(): void {
    this.getUserData();
    this.getAllPosts();
  }

  constructor(   public fb: FormBuilder,public datePipe: DatePipe,
    public jobservice:JobpostService, public router: Router,
    public userservice:UserauthenticateService) {
      this.calculateCharactersLeft();
  }

   //Submit to Job Post  Function
  //  onSubmitJob(form: NgForm) {
  //   if (this.jobservice.jobData) {
  //     this.jobservice.postJobPost(form.value).subscribe();
  //   }
  // }


  
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  UploadFileName(event:any) {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];
  this.uploadedFileName = file ? file.name : ''; 
}


    onSubmitJob(): void {
      const formData: FormData = new FormData();
      formData.append('Id', "05be61ea-747a-4720-ac1e-b2436323f05a");
      formData.append('DateLastModified', "0001-01-01T00:00:00");
      formData.append('LastModifiedBy', this.jobservice.jobData.lastModifiedBy);
      formData.append('DateCreated', "0001-01-01T00:00:00");
      formData.append('CreatedBy', this.jobservice.jobData.createdBy);
      formData.append('FileName', this.jobservice.jobData.fileName);
      formData.append('JobUniqueId', this.jobservice.jobData.jobUniqueId);
      formData.append('UsersId', this.jobservice.jobData.usersId);
      formData.append('JobTitle', this.jobservice.jobData.jobTitle);
      formData.append('Description', this.jobservice.jobData.description);   
      formData.append('Status', this.jobservice.jobData.status);   
      formData.append('SkillSet', this.jobservice.jobData.skillSet);
      formData.append('Complexity', this.jobservice.jobData.complexity);
      formData.append('ProjectStartDate', this.jobservice.jobData.projectStartDate);
      formData.append('ProjectEndDate', this.jobservice.jobData.projectEndDate);
      formData.append('DurationOfProject', this.jobservice.jobData.durationOfProject);
      formData.append('Experience', this.jobservice.jobData.experience);
      formData.append('RateBasis', this.jobservice.jobData.rateBasis);
      formData.append('FromBudget', this.jobservice.jobData.fromBudget);
      formData.append('ToBudget', this.jobservice.jobData.toBudget);
      formData.append('Currency', this.jobservice.jobData.currency);
      formData.append('UserEmail', this.jobservice.jobData.userEmail);
      formData.append('Service', this.jobservice.jobData.service);
      formData.append('AttachFile', this.jobservice.jobData.attachFile);
      formData.append('PostDate', this.jobservice.jobData.postDate);
      formData.append('AttachUrl', this.jobservice.jobData.attachUrl);
      if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('File', this.selectedFile, this.selectedFile.name);
      }

      this.jobservice.postJobPost(formData).subscribe(
        response => {
          console.log('Upload successful', response);
        },
        error => {
          console.error('Upload failed', error);
        }
      );
      this.SuccessModal();
  }


  SuccessModal() {
    this.success = false;
    setTimeout(() => {
      this.router.navigate(['/authors']);
    }, 3000);
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
        this.jobservice.jobData.usersId = this.User[0].id;
        this.jobservice.jobData.createdBy = `${this.User[0].firstName} ${this.User[0].lastName}`;
        this.firstName = (this.User[0].firstName || '').toUpperCase().slice(0, 1);
        this.lastName = (this.User[0].lastName || '').toUpperCase().slice(0, 2);
        this.jobservice.jobData.jobUniqueId = `A${this.firstName}${this.lastName} - ${totalPosts}`;
    });
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