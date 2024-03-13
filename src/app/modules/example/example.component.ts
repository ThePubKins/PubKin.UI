import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})

export class ExampleComponent {


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





