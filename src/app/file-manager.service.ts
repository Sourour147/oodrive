import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  baseurl = 'http://localhost:4401/api/items';

  constructor(private httpClient: HttpClient) { }

  getFolderContent(id?:any) {
    let url = this.baseurl;

    if (id) {
      url += "?parentId=" + id;
    }

    return this.httpClient.get(url);
  }

  createFolder(data: any, id?:any) {
    let url = this.baseurl;

    if (id) {
      url += "?parentId=" + id;
    }

    return this.httpClient.post(url, data);
  }

  delete(id: string) {
		return this.httpClient.delete(`${this.baseurl}/${id}`);
	}
  
  edit(id: string, data: any) {
    return this.httpClient.patch(`${this.baseurl}/${id}`, data);
  }

  upload(files: any, id?:any) {
    let url = this.baseurl;

    if (id) {
      url += "?parentId=" + id;
    }
    
    return this.httpClient.post(url, files);
  }
}
