import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FileManagerService } from '../file-manager.service';

@Component({
  selector: 'fl-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.css']
})
export class FolderContentComponent implements OnInit {
  @Input('items') items: any;
  @Output() folderCreated = new EventEmitter();
  closeResult: string;

  constructor(private modalService: NgbModal, private fileManagerService: FileManagerService) { }

  ngOnInit() {
  }

  createFolder(form: any) {
    let data = {
      folder: true,
      name: form.value.name
    };

    this.fileManagerService.createFolder(data).subscribe(
      (response: any) => {
        this.folderCreated.emit(response);
      }
    );
  }

  //Modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
