import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostService } from 'src/app/service/post.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  post: Postagem = new Postagem();
  idPost: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.');
      this.router.navigate(['/login']);
    }

    this.idPost = this.route.snapshot.params['id'];
    this.findByIdPost(this.idPost);
  }

  findByIdPost(id: number) {
    this.postService.getByIdPostagem(this.idPost).subscribe((resp: Postagem) => {
      this.post = resp;
    });
  }

  apagar() {
    this.postService.deletePostagem(this.idPost).subscribe(() => {
      this.alertas.showAlertSuccess('Post Apagado!!');
      this.router.navigate(['/feed']);
    });
  }
}
