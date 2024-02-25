import { Component } from '@angular/core';
import { FileuploadService } from './Service/fileupload.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  files : any;
  
  constructor(
    public fileService: FileuploadService ) { }


}
