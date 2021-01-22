import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FolderContentComponent } from './folder-content/folder-content.component';
import { FormsModule } from '@angular/forms';


@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		
	],
	declarations: [
		AppComponent,
		FileManagerComponent,
		FolderContentComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
