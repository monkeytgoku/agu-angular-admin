import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.css']
})
export class MultiLanguageComponent implements OnInit, AfterViewInit, AfterViewChecked {
  constructor(public translate: TranslateService, private cdRef: ChangeDetectorRef) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.cdRef.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  changeLang(value) {
    this.translate.use(value);
  }

}
