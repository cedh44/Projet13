import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {ChatTalkjsComponent} from './pages/chat-talkjs/chat-talkjs.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ChatTalkjsComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
