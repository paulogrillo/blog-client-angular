import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  user: Usuario = new Usuario();
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
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
        this.user = resp;
        this.router.navigate(['/entrar']);
        alert('Usuário cadastrado!');
      });
    }
  }
}
