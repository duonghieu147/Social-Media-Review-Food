import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {
  @Input() label = '';
  @Input() labelError: string;
  @Input() formControlItem: AbstractControl;
  @Input() notification: any;
  @Input() formalName: any;
  @Input() validation: any;

  constructor() { }

  ngOnInit() { }

}
