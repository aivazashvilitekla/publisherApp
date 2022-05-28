import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDnd]',
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver!: boolean;
  constructor() {}
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;

    console.log('drag over');
  }
  // leave
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log('drag leave');
  }
  @HostListener('dragleave', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      // this.fileDropped.emit(files)
    }
  }
}
