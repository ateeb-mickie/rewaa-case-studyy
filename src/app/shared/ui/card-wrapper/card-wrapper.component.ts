import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: [],
})
export class CardWrapperComponent implements OnInit {
  @Input('title') title: string | undefined;
  @ContentChild('content') content: TemplateRef<any> | undefined;

  constructor() {}

  ngOnInit(): void {}
}
