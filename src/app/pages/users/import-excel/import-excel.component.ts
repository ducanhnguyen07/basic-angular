import { Component, EventEmitter, Output } from '@angular/core';
import { ImportExcelService } from './import-excel.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrl: './import-excel.component.scss',
  providers: [MessageService],
})
export class ImportExcelComponent {
  selectedFile: File | null = null;
  @Output() uploadComplete = new EventEmitter<void>();

  constructor(
    private importExcelService: ImportExcelService,
    private messageService: MessageService,
  ) {}

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //   }
  // }

  // onClickImportExcel(fileInput: HTMLInputElement): void {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', this.selectedFile);

  //     this.importExcelService.importExcelFile(formData).subscribe(
  //       response => {
  //         alert('Import successful');
  //         console.log('Import successful', response);
  //       },
  //       error => {
  //         console.error('Import failed', error);
  //       }
  //     );
  //   } else {
  //     console.error('No file selected');
  //   }
  // }
  
  onUpload(event: any) {
    this.uploadComplete.emit();
  }
}
