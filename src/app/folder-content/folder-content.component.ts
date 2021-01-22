import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FileManagerService } from '../file-manager.service';


@Component({
  selector: 'fl-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.css']
})
export class FolderContentComponent implements OnInit {
  dataItem:any;
  @Input('items') items: any;
  @Output() CreatedFolder = new EventEmitter();
  @Output() folderDeleted = new EventEmitter();
  @Output() updated = new EventEmitter();
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
        this.CreatedFolder.emit(response);
      }
    );
  }

  delete(item: any) {

		this.fileManagerService.delete(item.id).subscribe(
			(response: any) => {
        this.folderDeleted.emit(response)
			},
     );}


  rename(form: any) {
  
		this.fileManagerService.edit(this.dataItem.id,form.value ).subscribe(
      (response: any) => {
        this.updated.emit(response)
        },
      );}
  

  //Modal
  open(content: any,item?:any) {
    if (item){
      this.dataItem=item
    }
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
