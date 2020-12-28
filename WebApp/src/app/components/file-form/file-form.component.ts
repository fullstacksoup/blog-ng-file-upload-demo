import { ImageFileService } from './../../services/image-file.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


class MediaImageClass {
  ImageId: number;
  Label: string;
  Description: string;
  Filename: number;
  UploadDate: any;
  Size: number;
  MimeType: string;
  Image: any;
}
@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  public imageFormData = new MediaImageClass();
  public imagePreview: any;
  public message: string;
  public imageForm: FormGroup;

  constructor(private fb: FormBuilder,
              private fileSVC: ImageFileService) { }


  // ************************************************************************************************************************
  // * NG EVENTS
  // ************************************************************************************************************************

  ngOnInit() {
    // Create a reactive form. Label and Image is required.
    this.imageForm = this.fb.group({
      label: ['', [Validators.required]],
      description: [''],
      image: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
     this.subs.unsubscribe();
    }
  }

  // ************************************************************************************************************************
  // * COMPONENT FUNCTIONS
  // ************************************************************************************************************************

  onSubmit($event) {
    this.imageFormData.Label = this.imageForm.controls.label.value;
    this.imageFormData.Description = this.imageForm.controls.description.value;

    this.fileSVC.addImageToDB(this.imageFormData);
  }

  preview(files) {

    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    // You can get the file specifications with Javascript or in the API.
    // This example uses the API.
    this.imageFormData.Filename = files[0].name;
    this.imageFormData.UploadDate = files[0].LastModifiedDate;
    this.imageFormData.MimeType = files[0].type;
    this.imageFormData.Size = files[0].size;
    this.imageFormData.Image = this.imagePreview = files[0];

  }


}
