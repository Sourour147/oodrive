import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileManagerService } from '../file-manager.service';

@Component({
  selector: 'fl-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  items: any;
  folderId: any;

  constructor(private fileManagerService: FileManagerService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.folderId = params.get('id');
      }

      this.getFolderContent();
    });
  }

  getFolderContent() {
    this.fileManagerService.getFolderContent(this.folderId).subscribe(
      (response: any) => {
        this.items = response.items;
      }
    )
  }

  handleCreatedFolder(newFolder: any) {
    this.items.push(newFolder);
  }

  handleFolderDeleted(item: any) {
		const index = this.items.indexOf(item);
		this.items.splice(index, 1);
		this.getFolderContent();
     }

  handleupdated($event:any){
    const index = this.items.findIndex((item:any) => item.id === $event.id);
    this.items[index] = $event;
     }
     
  handleaddFile(item: any) {
    const newArray = [...this.items, ...item];
    this.items = newArray;
    this.getFolderContent();
     }

 handlemoveItem($event:any){
    const index = this.items.findIndex((item:any) => item.id == $event);
    this.items.splice(index, 1);
    this.getFolderContent();
    }
    }
 
