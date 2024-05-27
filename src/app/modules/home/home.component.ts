import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommentsService } from "../../shared";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(
    private router: Router,
    public commentService: CommentsService,
    private datePipe: DatePipe
  ) {}

  user1 = "'author'";
  hide = false;

  hide1() {
    this.hide = !this.hide;
  }

  navigateToProfile(action: string): void {
    this.router.navigate(["/signup", action]);
  }

  navigateToPubkin(content: string): void {
    this.router.navigate(["/docs", content]);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
