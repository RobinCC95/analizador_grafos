import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from '../modelos/usuarioModelo';
import { UsuarioService } from '../usuario.service';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
//const myDiagram = new go.Diagram("myDiagramDiv");
export class LoginUserComponent implements OnInit {
  usuarioList: UsuarioModelo[] = [];
  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getListUsers().subscribe(
      data => {
        this.usuarioList = data.data;
        console.log(this.usuarioList);
      },
      error => console.log(error)
    );
  }

}
