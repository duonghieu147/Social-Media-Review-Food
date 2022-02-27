import { Component } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent  {

  constructor(private msg: NzMessageService) {}

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      console.log('f file uploaded successfully')

    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
      console.log('file upload failed')
    }
  }
}
