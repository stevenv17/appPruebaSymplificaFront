import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  modalVisible: boolean = false;
  userForm: any = {
    id: null, 
    name: null,
    lastName: null,
    email: null
  }
  modalTitle: string = "New User";
  listUsers: any = [];

  constructor(private userService: UserService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  showModal() {
    this.cleanUserForm();
    this.modalVisible = true;
  }

  cleanUserForm() {
    this.userForm = {
      id: null, 
      name: null,
      lastName: null,
      email: null
    }
  }

  newUser() {
    let body = {user: this.userForm};
    this.userService.newUser(body).subscribe(
      (data) => {
        this.modalVisible = false;
        this.message.create('success', 'User created');
        this.loadUsers();
        },
        err => {
          this.message.create('error', "Error");
        }
    );
  }

  loadUsers() {
    this.userService.getListUsers().subscribe(
      (data) => {
        
          let users: any = data;
          this.listUsers = users;          
        
        },
        err => {
          this.message.create('error', "Error");
        }
    );
    
  }

  deleteUser(row) {
    this.userService.deleteUser(row.id).subscribe(
      (data) => {
        
          this.loadUsers();
          this.message.create('success', 'User deleted');         
        
        },
        err => {
          this.message.create('error', "Error");
        }
    );

  }

}
