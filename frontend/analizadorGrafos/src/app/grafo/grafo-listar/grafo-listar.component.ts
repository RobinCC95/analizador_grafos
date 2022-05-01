import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GrafoModel } from 'src/app/modelos/grafoModel';
import { GrafoService } from '../grafo.service';

@Component({
  selector: 'app-grafo-listar',
  templateUrl: './grafo-listar.component.html',
  styleUrls: ['./grafo-listar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrafoListarComponent implements OnInit {
  grafoArray: GrafoModel[] = [];
  constructor(private grafoService: GrafoService ) { }

  ngOnInit(): void {
    this.grafoService.getListGrafos().subscribe(
      (data) => {
        console.log(data);
        this.grafoArray = data.data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
