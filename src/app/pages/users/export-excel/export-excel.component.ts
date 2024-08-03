import { Component } from '@angular/core';
import { ExportExcelService } from './export-excel.service';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrl: './export-excel.component.scss',
})
export class ExportExcelComponent {
  constructor(private exportExcelService: ExportExcelService) {}

  onClickExportExcel() {
    this.exportExcelService.exportExcelFile().subscribe(
      (data) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'user-list.xlsx';
        a.click();

        window.URL.revokeObjectURL(url); // cancel URL object sau khi sử dụng
      },
      (error) => {
        console.error('Error downloading the file', error);
      }
    );
  }
}