import {Injectable} from '@angular/core';
import Talk from "talkjs";
import {SessionService} from './session.service';
import {User} from "../core/models/user";

@Injectable({
    providedIn: 'root'
})
export class TalkService {
    private currentUser!: Talk.User;

    /*
    async createUser(applicationUser: any) {
        await Talk.ready;
        return new Talk.User({
            id: 0,
            name: 'Josiane',
            photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
            role: 'default'
        });
    }
    */

    //L'objet Talk.user est utilisé pour synchroniser les données avec TalkJS

    constructor(private sessionService: SessionService) {
    }

    //Une session réprésente un onglet actif dans le navigateur du user
    //qu'on pourra afficher dans l'UI du chat
    async createTalkUser(applicationUser: User) {
        await Talk.ready;
        return new Talk.User({
            id: applicationUser.id,
            name: applicationUser.username,
            photoUrl: applicationUser.photoUrl,
            welcomeMessage: applicationUser.welcomeMessage,
            role: applicationUser.role
        });
    }

    //Ici la méthode récupère la conversation entre deux utilisateurs si existante
    //Ici on récupère les données en session suite au login du user
    async createCurrentSession() {
        await Talk.ready;
        const user = {
            id: this.sessionService.userSession.id,
            username: this.sessionService.userSession.username,
            password: '',
            email: this.sessionService.userSession.email,
            photoUrl: this.sessionService.userSession.photoUrl,
            welcomeMessage: this.sessionService.userSession.welcomeMessage,
            role: this.sessionService.userSession.role
        };
        console.log('createCurrentSession / create user');
        console.log('createCurrentSession / username : '+user.username);
        this.currentUser = await this.createTalkUser(user);
        const session = new Talk.Session({
            appId: 't6znNRfu', me: this.currentUser
        });
        return session;
    }

    async createInbox(session: Talk.Session) {
        let otherApplicationUser = undefined;
        console.log("createInbox / this.sessionService.userSession.id = "+this.sessionService.userSession.id);
        if (this.sessionService.userSession.id == '0') {
            otherApplicationUser = {
                id: '1',
                username: 'pierre',
                password: '',
                email: 'pierre@gmail.com',
                photoUrl: 'https://talkjs.com/images/avatar-4.jpg',
                welcomeMessage: 'Bonjour'
            }
            console.log("otherApplicationUser.id : "+otherApplicationUser.id);
        } else {
            otherApplicationUser = {
                id: '0',
                username: 'support',
                password: '',
                email: 'support@yourcaryourway.com',
                photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
                welcomeMessage: 'Bonjour, comment peut-on vous aider ?'
            }
            console.log("otherApplicationUser.id) : "+otherApplicationUser.id);
        }
        const conversation = await this.getOrCreateConversation(session, otherApplicationUser);
        const inbox = session.createInbox();
        inbox.select(conversation);
        return inbox;
    }

    async getOrCreateConversation(session: Talk.Session, otherApplicationUser: any) {
        const otherUser = await this.createTalkUser(otherApplicationUser);
        //Talk.oneOnOneId calcule l'ID de conversation basé sur les ID des participants
        const conversation = session.getOrCreateConversation(Talk.oneOnOneId(this.currentUser, otherUser));
        conversation.setParticipant(this.currentUser);
        conversation.setParticipant(otherUser);
        return conversation;
    }
}
