import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ThemeEditComponent } from './edit/theme-edit/theme-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FeedComponent } from './feed/feed.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthService } from './service/auth.service';
import { TemasComponent } from './temas/temas.component';
import { ThemeDeleteComponent } from './delete/theme-delete/theme-delete.component';
import { PostEditComponent } from './edit/post-edit/post-edit.component';
import { PostDeleteComponent } from './delete/post-delete/post-delete.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'entrar', component: EntrarComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'inicio', component: InicioComponent },

  { path: 'temas', component: TemasComponent },
  { path: 'theme-edit/:id', component: ThemeEditComponent },
  { path: 'theme-delete/:id', component: ThemeDeleteComponent },

  { path: 'post-edit/:id', component: PostEditComponent },
  { path: 'post-delete/:id', component: PostDeleteComponent },

  { path: 'feed', component: FeedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
