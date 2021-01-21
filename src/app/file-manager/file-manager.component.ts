import { Component, OnInit } from '@angular/core';
import { FileManagerService } from '../file-manager.service';

@Component({
  selector: 'fl-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  items: any;

  constructor(private fileManagerService: FileManagerService) { }

  ngOnInit() {
    this.getFolderContent();
  }

  getFolderContent() {
    this.fileManagerService.getFolderContent().subscribe(
      (response: any) => {
        this.items = response.items;
      }
    )
  }

  handleFolderCreated(newFolder: any) {
    this.items.push(newFolder);
  }
}
