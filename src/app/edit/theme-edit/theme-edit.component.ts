import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css'],
})
export class ThemeEditComponent implements OnInit {
  theme: Tema = new Tema();

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.');
      this.router.navigate(['/login']);
    }
    let idTema = this.route.snapshot.params['id'];
    this.findAllThemes(idTema);
  }

  atualizar() {
    this.themeService.putTheme(this.theme).subscribe(
      (resp: Tema) => {
        this.theme = resp;
        this.alertas.showAlertSuccess('Tema Atualizado!');
        this.router.navigate(['/temas']);
      },
      (err) => {
        if (err.status == 400) {
          this.alertas.showAlertDanger(
            'Esse tema não pode ser atualizado, pois já pertence a uma postagem'
          );
          this.router.navigate(['/temas']);
        }
      }
    );
  }

  findAllThemes(id: number) {
    this.themeService.getByIdTheme(id).subscribe((resp: Tema) => {
      this.theme = resp;
    });
  }
}
