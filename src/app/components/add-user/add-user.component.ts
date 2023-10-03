import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
}
@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('nomeInput') nomeInput!: ElementRef;
  @ViewChild('sobreNomeInput') sobreNomeInput!: ElementRef;

  url:any= window.location.href;
  idRegex = /\/add-user\/([a-zA-Z0-9]+)/;
  matches = this.url.match(this.idRegex);
  campoDesabilitado: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.matches){
      this.fillFields()
      this.campoDesabilitado = true
    }
  }

  fillFields(){
    return this.userService.getUser(this.matches[1]).subscribe(
      (data: any) => {
        this.emailInput.nativeElement.value = data.email;
        this.nomeInput.nativeElement.value = data.firstName;
        this.sobreNomeInput.nativeElement.value = data.lastName;
      },
      (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    );
  }

  AtualizaDados(e:any) {
    e.preventDefault()
    const updatedUser: User = {
      firstName: this.nomeInput.nativeElement.value,
      lastName: this.sobreNomeInput.nativeElement.value,
    };

    this.userService.updateUser(this.matches[1], updatedUser).subscribe(
      (data: any) => {
        console.log('Usuário atualizado com sucesso:', data);
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
      }
    );
  }
  addUser(e:any) {
    e.preventDefault()
    const email = this.emailInput.nativeElement.value;
    const firstName = this.nomeInput.nativeElement.value;
    const lastName = this.sobreNomeInput.nativeElement.value;
    const newUser: User = {
      firstName,
      lastName,
      email
    };
    return this.userService.addUser(newUser).subscribe(
      (data: any) => {
        console.log('Usuário adicionado com sucesso:', data);
      },
      (error) => {
        console.error('Erro ao adicionar usuário:', error);
      }
    );
  }


}
