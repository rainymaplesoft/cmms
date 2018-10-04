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
  styles: [
    `
      .footer {
        display: flex;
        width: 100 %;
        margin-top: 20px;
        padding-top: 20px;
        background-color: rgba(12, 12, 12, 0.8);
        @media (max - width: 780px) {
          flex-direction: column;
        }
      }

      .footer .section {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .footer .section .item {
        display: flex;
        justify-content: center;
        font-size: 17px;
        line-height: 40px;
        text-transform: none;
        font-family: Montserrat, Helvetica Neue, Helvetica, Arial, sans - serif;
      }
      .footer .section .item button {
        font-size: 24px;
        background-color: black;
        color: wheat;
        margin-right: 5px;
      }
      .footer .section .item a {
        margin: 0 5px;
        color: yellowgreen;
      }
    `
  ]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
