import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExportExcelService {

    constructor() { }

    public exportAsExcelFile(json: any[],json1: any[], json2: any[], excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const worksheet1:XLSX.WorkSheet = XLSX.utils.json_to_sheet(json1);
        const worksheet2:XLSX.WorkSheet = XLSX.utils.json_to_sheet(json2);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Base License');
        XLSX.utils.book_append_sheet(workbook, worksheet1, 'Multiple PO License');
        XLSX.utils.book_append_sheet(workbook, worksheet2, 'Maintenance License'); 
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

}