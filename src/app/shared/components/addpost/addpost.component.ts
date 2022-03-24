import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent  {
  inputValue: string = '';

  suggestions = ['Coffee', 'Do uong', 'user 1', 'user 2', 'Nha hang 1', 'Quan'];

  validateForm!: FormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    var img =[];
    img.push(this.validateForm.value.images)
    img.push(this.validateForm.value.images2)
    img.push(this.validateForm.value.images3)
    console.log('img', img);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      description: [null],
      images: [null],
      images2: [null],
      images3: [null],
      tags: [null],
    });
  }

  onChange(value: string): void {
    console.log(value);
  }

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
  cancel(){
    console.log('cancel');
  }
}
