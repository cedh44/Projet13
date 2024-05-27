import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ChatTalkjsComponent} from './pages/chat-talkjs/chat-talkjs.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {path: '', component: LoginComponent,},
    {path: 'home', component: HomeComponent,},
    {path: 'chat', component: ChatTalkjsComponent,},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
