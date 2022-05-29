import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  @ViewChild('inputCamera') inputCamera: ElementRef;
  @ViewChild('video') video: ElementRef;
  isHidden: boolean=true;
  name='Dương Văn Hiếu'
  srcVideo =[
    "https://v16-webapp.tiktok.com/2b6bd9e6b0a21a324cfcfb51f1596599/62939abf/video/tos/useast2a/tos-useast2a-pve-0037-aiso/a1c6eb16e6994ac7b24a86ac75d0483e/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2598&bt=1299&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8Z.1aSwe2NKlhml7Gb&mime_type=video_mp4&qs=0&rc=PDozOWZpNGdkOWdkNTszOUBpMzk7PDY6ZjZxPDMzZjgzM0BiMWFiMzQtNjYxL15fXl9gYSNncDZfcjQwbTNgLS1kL2Nzcw%3D%3D&l=202205291009020102440422431F49C927",
    "https://v16-webapp.tiktok.com/206ccefc19443ede5a4935f58f6a4e90/62939b8a/video/tos/useast2a/tos-useast2a-pve-0037-aiso/dc452de426d64a7880fc8d5fda4c2930/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=4052&bt=2026&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8ZIUaSwe2NWehml7Gb&mime_type=video_mp4&qs=0&rc=aTRmNWg1Ozw6ZDo2aDU4NkBpamVycWc6Znd4OzMzZjgzM0AvNF8yMy40Ni4xMS0xLjAuYSNtNXI2cjRnYDFgLS1kL2Nzcw%3D%3D&l=20220529101158010245245003164970D5",
    "https://v16-webapp.tiktok.com/a20dfd6ba79cb6314681f22919318367/62939b8a/video/tos/useast2a/tos-useast2a-pve-0037-aiso/e4f94dcd71be4e55b428b4c07fb7c2f2/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=5872&bt=2936&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8ZIUaSwe2NWehml7Gb&mime_type=video_mp4&qs=0&rc=NzVlZTRoMzg3Zjs8aGVoO0BpajxuZjM6ZjNkOzMzZjgzM0AtNTNeLjIvNS8xXzMuYC9jYSNlczFncjRfaGBgLS1kL2Nzcw%3D%3D&l=20220529101158010245245003164970D5",
    "https://v16-webapp.tiktok.com/146e18f6bf4479169ee442c77e759fc8/62939b63/video/tos/useast2a/tos-useast2a-pve-0037-aiso/e09385f78f7e4068aa93d2434f4faa3a/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=5048&bt=2524&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8ZIUaSwe2NWehml7Gb&mime_type=video_mp4&qs=0&rc=OzkzNDY0ZGg0NjQ4Z2U0NUBpajZlczY6Zm91ZDMzZjgzM0AwNC4zMzYwNjIxLTI1XmAxYSNna2FwcjRfLy5gLS1kL2Nzcw%3D%3D&l=20220529101158010245245003164970D5",
    "https://v16-webapp.tiktok.com/ce8229d96f3a692e963d21d95e92b37c/62939b96/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/0696fb66b4d0418eba53b1444aff1958/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2390&bt=1195&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8ZIUaSwe2NWehml7Gb&mime_type=video_mp4&qs=0&rc=ZzQ7M2U3PGU7PGU0Z2loPEBpamp4eDs6ZndtOzMzZjgzM0BfLmEwNS8wXjAxY19hMWAtYSNtYGNecjRvLmlgLS1kL2Nzcw%3D%3D&l=20220529101158010245245003164970D5",
    "https://v16-webapp.tiktok.com/32d0c2c9a75bf5fa4b8869683c8ab8e4/62939b86/video/tos/useast2a/tos-useast2a-pve-0037-aiso/efce0aa606bf462a84bb591513bef0c0/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2622&bt=1311&btag=80000&cs=0&ds=3&ft=eXd.6Hk_Myq8ZIUaSwe2NWehml7Gb&mime_type=video_mp4&qs=0&rc=ODdpaWU2NzU1PDw1aGVmNkBpMzY8djs6ZjRqPDMzZjgzM0BiM2FiLl8tNTIxYmAzLjZfYSNwYy0tcjRfbWZgLS1kL2Nzcw%3D%3D&l=20220529101158010245245003164970D5"
  ]
  

  constructor() { }

  ngOnInit(): void {
    console.log('srcVideo',this.srcVideo)
    this.name = localStorage.getItem('displayName')
  }
  create() {
    this.inputCamera.nativeElement.value = null;
    this.inputCamera.nativeElement.click();
    // if (this.inputCamera.nativeElement.value) {
    //   this.scrollTop()
    // }
  }
  actionVideo(event :any) {
    const video = event.target
    document.querySelectorAll('video').forEach((video) => {
      if(video !=event.target) {
        video.pause();
      }
    })
    if (video.paused) {
      video.play();
    }
    else {
      video.pause();
    }
  }
  onChangeInput(){
    const file = this.inputCamera.nativeElement.files[0];
    console.log(this.inputCamera.nativeElement.files[0]);
    const videourl = URL.createObjectURL(file);
    this.video.nativeElement.src= videourl 
    this.isHidden = false;
    this.scrollTop()
    // const inputFile = document.getElementById("file");
    // const video = document.getElementById("video");
    
    // inputFile.addEventListener("change", function(){
    //     const file = inputFile.files[0];
    //     const videourl = URL.createObjectURL(file);
    //     video.setAttribute("src", videourl);
    //     video.play();
    // })
  }
  
  scrollTop():void {
    window.scroll({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });
  }

}
