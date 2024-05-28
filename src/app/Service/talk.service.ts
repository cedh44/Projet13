import {Injectable} from '@angular/core';
import Talk from "talkjs";
import {SessionService} from './session.service';
import {User} from "../core/models/user";

@Injectable({
    providedIn: 'root'
})
export class TalkService {
    //L'objet Talk.user est utilisé pour synchroniser les données avec TalkJS
    private currentUser!: Talk.User;

    constructor(private sessionService: SessionService) {
    }

    //Création du TalkUser
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

    //Une session réprésente un onglet actif dans le navigateur du user
    //qu'on pourra afficher dans l'UI du chat
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
        this.currentUser = await this.createTalkUser(user);
        const session = new Talk.Session({
            appId: 't6znNRfu', me: this.currentUser
        });
        return session;
    }

    //Ici la méthode récupère la conversation entre deux utilisateurs (si existante)
    async getOrCreateConversation(session: Talk.Session, otherApplicationUser: any) {
        const otherUser = await this.createTalkUser(otherApplicationUser);
        //Talk.oneOnOneId calcule l'ID de conversation basé sur les ID des participants
        const conversation = session.getOrCreateConversation(Talk.oneOnOneId(this.currentUser, otherUser));
        conversation.setParticipant(this.currentUser);
        conversation.setParticipant(otherUser);
        return conversation;
    }

    //Inbox permet d'afficher la conversation, ici entre nos deux utilisateurs, et d'écrire des messages
    //On a notre utilisateur connecté présent dans l'objet session et l'autre utilisateur avec qui il converse dans l'objet otherApplicationUser
    async createInbox(session: Talk.Session) {
        let otherApplicationUser = {
            id: '',
            username: '',
            password: '',
            email: '',
            photoUrl: '',
            welcomeMessage: ''
        };

        //Dans ce POC nous avons que 2 utilisateurs donc otherApplicationUser prend les valeurs du user non connecté
        if (this.sessionService.userSession.id == '0') {
            otherApplicationUser = {
                id: this.sessionService.usersSession[1].id,
                username: this.sessionService.usersSession[1].username,
                password: '',
                email: this.sessionService.usersSession[1].email,
                photoUrl: this.sessionService.usersSession[1].photoUrl,
                welcomeMessage: this.sessionService.usersSession[1].welcomeMessage
            }
        } else {
            otherApplicationUser = {
                id: this.sessionService.usersSession[0].id,
                username: this.sessionService.usersSession[0].username,
                password: '',
                email: this.sessionService.usersSession[0].email,
                photoUrl: this.sessionService.usersSession[0].photoUrl,
                welcomeMessage: this.sessionService.usersSession[0].welcomeMessage
            }
        }

        const conversation = await this.getOrCreateConversation(session, otherApplicationUser);
        const inbox = session.createInbox();
        inbox.select(conversation);
        return inbox;
    }
}
