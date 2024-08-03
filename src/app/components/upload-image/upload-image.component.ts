import { Component } from '@angular/core';
import { UploadImageService } from './upload-image.service';
import { MessageService } from 'primeng/api';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
  providers: [MessageService],
})
export class UploadImageComponent {
  selectedFile!: ImageSnippet;
  imageUrl: string | ArrayBuffer = '';

  constructor(
    private uploadImageService: UploadImageService,
    private messageService: MessageService
  ) {}

  private onSuccess() {
    alert('Upload successful');
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(file: any) {
    const imageFile: File = file.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, imageFile);

      this.selectedFile.pending = true;
      this.uploadImageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          console.log(err);
          this.onError();
        }
      );
    });

    reader.readAsDataURL(imageFile);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
    }
  }

  onUpload(event: any) {
    console.log(event)
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }
}
