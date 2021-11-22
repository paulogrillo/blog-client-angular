import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { MainComponent } from './main/main.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { FeedComponent } from './feed/feed.component';
import { TemasComponent } from './temas/temas.component';
import { ThemeEditComponent } from './edit/theme-edit/theme-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { AlertComponent } from './alert/alert.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';
import { ThemeDeleteComponent } from './delete/theme-delete/theme-delete.component';
import { PostDeleteComponent } from './delete/post-delete/post-delete.component';
import { PostEditComponent } from './edit/post-edit/post-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EntrarComponent,
    MenuComponent,
    CadastrarComponent,
    InicioComponent,
    FeedComponent,
    RodapeComponent,
    TemasComponent,
    ThemeEditComponent,
    UserEditComponent,
    AlertComponent,
    ThemeDeleteComponent,
    PostDeleteComponent,
    PostEditComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OrderModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
