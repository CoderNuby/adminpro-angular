import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  contenido: string;

  constructor( private router: Router, private title: Title, private meta: Meta) {
    this.GetDataRouter().subscribe((dato) => {
      console.log(dato);
      this.titulo = dato.titulo;
      this.contenido = dato.contenido;
      console.log(this.contenido);
      title.setTitle(this.titulo);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.contenido
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  GetDataRouter(){
    return this.router.events.pipe(
      filter((evento) => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild == null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
