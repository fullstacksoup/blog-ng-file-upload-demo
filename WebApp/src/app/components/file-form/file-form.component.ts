
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImageFileService } from 'src/app/services/image-file.service';


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
  selector: 'file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit, OnDestroy {
  @Output() onSubmitForm = new EventEmitter<any>();
  private subs = new Subscription();
  private imageFormData = new MediaImageClass();
  public Filename: string;
  public UploadDate: any;
  public Size: number;
  public MimeType: string;
  public imageURL: string;
  public imagePreview: any;
  public message: string;
  public imageForm: FormGroup;
  public imgURL: string | ArrayBuffer;

  constructor(private fb: FormBuilder,
              private fileSVC: ImageFileService) { }


  // ************************************************************************************************************************
  // * NG EVENTS
  // ************************************************************************************************************************

  ngOnInit() {
    this.imgURL = 'assets/images/blank_image.jpg';
    this.Size = 0;
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

    this.onSubmitForm.emit(this.imageForm);
    this.imageForm.reset();
    this.removeImage();
    this.imageForm.controls.label.setValue('');
    this.imageForm.controls.description.setValue('');
    this.imageForm.controls.label.setErrors(null);
    this.imageForm.controls.description.setErrors(null);

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
    this.Filename = this.imageFormData.Filename = files[0].name;
    this.UploadDate = this.imageFormData.UploadDate = files[0].LastModifiedDate;
    this.MimeType = this.imageFormData.MimeType = files[0].type;
    this.Size = this.imageFormData.Size = files[0].size;
    this.imageFormData.Image = this.imagePreview = files[0];
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  removeImage(): void {
    this.Filename = '';
    this.UploadDate = '';
    this.MimeType = '';
    this.Size = 0;
    this.imgURL = 'assets/images/blank_image.jpg';

  }

}
