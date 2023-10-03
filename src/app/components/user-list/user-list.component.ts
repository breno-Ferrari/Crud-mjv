import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data.data;
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      (data: any) => {
        console.log('Usuário excluído com sucesso:', data);
        this.userService.getUsers().subscribe(
          (data: any) => {
            this.users = data.data;

          })
      },
      (error) => {
        console.error('Erro ao excluir usuário:', error);
      }
    );
  }
  updateUser(userId: string){
    this.router.navigate([`/add-user/${userId}`]);
  }
}
