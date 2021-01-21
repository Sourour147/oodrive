import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  baseurl = 'http://localhost:4401/api/items';

  constructor(private httpClient: HttpClient) { }

  getFolderContent() {
    return this.httpClient.get(this.baseurl);
  }

  createFolder(data: any) {
    return this.httpClient.post(this.baseurl, data);
  }
}
