import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ChatTalkjsComponent} from './pages/chat-talkjs/chat-talkjs.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
    {title: 'Your Car Your Way - Login', path: '', component: LoginComponent,},
    {title: 'Your Car Your Way - Bienvenue', path: 'home', component: HomeComponent,},
    {title: 'Your Car Your Way - Chat', path: 'chat', component: ChatTalkjsComponent,},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
