import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {
  @Input() imgMimeType: string;
  @Input() imgData: any;
  image: string;
  base64Image: any;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.image = `data:image/png;base64,${this.imgData}`;
    this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(this.image);
  }

}
