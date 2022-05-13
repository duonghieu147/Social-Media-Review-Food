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
  constructor() { }

  ngOnInit(): void {
  }
  create() {
    this.inputCamera.nativeElement.value = null;
    this.inputCamera.nativeElement.click();
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
    // const inputFile = document.getElementById("file");
    // const video = document.getElementById("video");
    
    // inputFile.addEventListener("change", function(){
    //     const file = inputFile.files[0];
    //     const videourl = URL.createObjectURL(file);
    //     video.setAttribute("src", videourl);
    //     video.play();
    // })
  }
}
