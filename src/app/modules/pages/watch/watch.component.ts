import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  // @ViewChild('inputCamera') inputCamera: ElementRef;
  constructor() { }

  ngOnInit(): void {
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
    document.querySelector('input')
    alert(document.querySelectorAll('input'));
  }
}
