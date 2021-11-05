import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  user: User = new User();
  passValidation: string;
  usersType: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  passwordValidation(event: any) {
    this.passValidation = event.target.value;
  }

  userType(event: any) {
    this.usersType = event.target.value;
  }

  signUp() {
    this.user.tipo = this.usersType;

    if (this.user.senha != this.passValidation) {
      alert('A senhas estão incorretas');
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(['/entrar']);
        alert('Usuário cadastrado!');
      });
    }
  }
}
