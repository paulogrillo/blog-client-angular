import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostService } from '../service/post.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {

  //Instância de postagem
  postagem: Postagem = new Postagem();
  //ArrayList de postagens
  listaPostagens: Postagem[];
  //Titulo da postagem
  tituloPost: string;

  //Instância de Tema
  theme: Tema = new Tema();
  //ArrayList de Temas
  themeList: Tema[];
  //Id de Tema
  idTheme: number;
  //Nome de Tema
  nameTheme: string = '';
  //Instância de usuario
  user: Usuario = new Usuario();

  //Variáveis de ambiente
  idUserLogado = environment.id;
  fotoUserLogado = environment.foto;
  nomeUserLogado = environment.nome;

  key = 'data';
  reverse = true;
  token = environment.token;

  constructor(
    private router: Router,
    private alertas: AlertasService,
    private postService: PostService,
    private temaService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.');
      this.router.navigate(['/entrar']);
    }
    this.findAllPostagens();
    this.findAllTemas();
    this.findByIdUser();
  }

  findAllPostagens() {
    this.postService.getAllPostagens().subscribe(
      (resp: Postagem[]) => {
        this.listaPostagens = resp;
        console.log(resp);
      },
      (err) => {
        console.log(this.listaPostagens);
      }
    );
  }

  findByIdUser() {
    this.authService.getByIdUser(environment.id).subscribe((resp: Usuario) => {
      this.user = resp;
    });
  }

  findAllTemas() {
    this.temaService.getAllTheme().subscribe((resp: Tema[]) => {
      this.themeList = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTheme(this.idTheme).subscribe((resp: Tema) => {
      this.theme = resp;
    });
  }
  /*
    IMPLEMENTAR BUSCA POR NOME
  findByNomeTema() {
    console.log(this.nameTheme)
    if (this.nameTheme == '') {
      this.findAllTemas()
    } else {
      this.temaService.(this.nameTheme).subscribe((resp: Theme[]) => {
        this.themeList = resp
      })
    }
  }
  */

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.findAllPostagens();
    } else {
      this.postService
        .getByNomePostagem(this.tituloPost)
        .subscribe((resp: Postagem[]) => {
          this.listaPostagens = resp;
        });
    }
  }

  publicar() {
    this.theme.id = this.idTheme;
    this.postagem.tema = this.theme;
    this.user.id = environment.id;
    this.postagem.usuario = this.user;
    this.postService.postPostagem(this.postagem).subscribe(
      (resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem realizada com sucesso!');
        this.findAllPostagens();
        this.findByIdUser();
        this.findAllTemas();
        this.postagem = new Postagem();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
