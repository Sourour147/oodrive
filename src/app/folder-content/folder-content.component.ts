import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input('folderId') folderId: any;
  @Output() CreatedFolder = new EventEmitter();
  @Output() folderDeleted = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() addFile = new EventEmitter();
  closeResult: string;
  files: File[] = [];

  constructor(private modalService: NgbModal, private fileManagerService: FileManagerService,  private route: Router) { }

  ngOnInit() {
    
		
  }

  createFolder(form: any) {
    let data = {
      folder: true,
      name: form.value.name
    };

    this.fileManagerService.createFolder(data, this.folderId).subscribe(
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
  
  goTo(folderId: any) {
    this.route.navigate(['', folderId]);
  }

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

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) { 
      formData.append("file[]", this.files[i]);
    }

    // formData.append('parentId', this.currentFolder);

    this.fileManagerService.upload(formData, this.folderId).subscribe((response: any) => {
      console.log('sent', response);
  this.addFile.emit(response.items);
        this.files = [];
      
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
