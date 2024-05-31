import {Component} from '@angular/core';
import {UserService} from 'src/app/Service/user.service';
import {User} from 'src/app/core/models/user'
import {Router} from "@angular/router";
import {SessionService} from "../../Service/session.service";

@Component({
    selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private userService: UserService, private router: Router, private sessionService: SessionService) {
    }

    //Authentification de l'utilisateur, on vérifie que le couplet user/password est bien dans le fichier json
    //Si oui, on met le user et le tableau de user en session
    login(): void {
        this.userService.getUsers().subscribe({
            next: (users) => {
                const user = users.find((u: User) => u.username === this.username && u.password === this.password);
                if (user) {
                    console.log('Authentification réussie');
                    //On garde en session le user connecté et le tableau de users
                    this.sessionService.logIn(user);
                    this.sessionService.saveUsersInSession(users);
                    if (user.id === "0") {
                        //En tant que support, redirection aussitôt vers le chat
                        this.router.navigate(['chat']);
                    } else {
                        //En tant qu'utilisateur, redirection vers home (avec lien vers le chat)
                        this.router.navigate(['home']);
                    }
                } else {
                    this.errorMessage = 'Mauvais utilisateur ou mot de passe';
                }
            }, error: (err) => {
                console.log('Erreur avec le fichier json des users', err);
                this.errorMessage = 'Erreur lors du login';
            }
        })
    }
}
