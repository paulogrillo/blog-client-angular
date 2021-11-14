import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css'],
})
export class TemasComponent implements OnInit {
  theme: Theme = new Theme();
  themeList: Theme[];

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    } else {
      this.findAllThemes();
    }
  }

  findAllThemes() {
    this.themeService.getAllTheme().subscribe((resp: Theme[]) => {
      this.themeList = resp;
    });
  }

  crudTheme() {
    this.themeService.postTheme(this.theme).subscribe((resp: Theme) => {
      this.theme = resp;
      console.log('Tema cadastrado com sucesso!');
      this.findAllThemes();
      this.theme = new Theme();
    });
  }
}
