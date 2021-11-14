import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css'],
})
export class TemasComponent implements OnInit {
  theme: Tema = new Tema();
  themeList: Tema[];

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
/* */
    if (environment.token != '') {
      this.findAllThemes();
    } else {
      this.alertas.showAlertInfo('Sessão expirada!');
      this.load();
      this.router.navigate(['/inicio']);
    }
  }

  load() {
    //Session storage salva os dados como string
    (sessionStorage.refresh == 'true' || !sessionStorage.refresh) &&
      location.reload();
    sessionStorage.refresh = false;
  }

  findAllThemes() {
    this.themeService.getAllTheme().subscribe((resp: Tema[]) => {
      this.themeList = resp;
    });
  }

  crudTheme() {
    this.themeService.postTheme(this.theme).subscribe((resp: Tema) => {
      this.theme = resp;
      console.log('Tema cadastrado com sucesso!');
      this.findAllThemes();
      this.theme = new Tema();
    });
  }
}
