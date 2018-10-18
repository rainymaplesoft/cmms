import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
            <div class="footer">
            <div class="section flex_1">
                <div class="item"><span class="copyright">Copyright&nbsp;© Badmintonhub 2018</span></div>
            </div>
            <div class="section">
                <div class="item">
                <button mat-mini-fab><i class="fab fa-facebook-f"></i></button>
                <button mat-mini-fab><i class="fab fa-twitter"></i></button>
                <button mat-mini-fab><i class="fab fa-linkedin-in"></i></button>
                </div>
            </div>
            <div class="section flex_1">
                <div class="item terms">
                <div><a href="#">Privacy Policy</a></div>
                <div><a href="#">Terms of Use</a></div>
                </div>
            </div>
            </div>`,
  styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
