import { Component, EventEmitter, Input, Output } from "@angular/core";
import { formatFileSize } from "src/app/common/util";

@Component({
    selector: 'upload-component',
    templateUrl: 'upload.component.html'
})
export class UploadComponent {

    name = '';
    size = '';

    @Input()
    requiredFileType?: string;

    @Output()
    onEventFileSelected = new EventEmitter<File>();

    onFileSelected(e: any) {
        const file: File = e.target.files[0];
        this.name = file.name;
        this.size = formatFileSize(String(file.size));
        this.onEventFileSelected.emit(file);
    }

}