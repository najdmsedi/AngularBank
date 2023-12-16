import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/userservice/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myForm!: FormGroup;
  errorMessage!: string;

  constructor(private userService: UserService, private router: Router) {
    this.myForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    const user: User = {
      username: this.myForm.value.username,
      password: this.myForm.value.password,
      token: '',
      id: 0,
    };
    console.log(user);
    this.loginUser();
  }
  // this.userService.signIn(user).subscribe((username) => {
  //   console.log(username);
  //   console.log('user');
  //   this.router.navigate(['/home']);
  // });
  loginUser() {
    const userlogin: User = {
      username: this.myForm.value.username,
      password: this.myForm.value.password,
      token: '',
      id: 0,
    };
    
    this.userService.Login(userlogin).subscribe(id => {
      localStorage.setItem('id',String(id));
      console.log(localStorage.getItem('id'))
      this.router.navigate(['/home']).then(x =>
        window.location.reload()
      )
    })
  }

  logoutUser(){
    localStorage.removeItem('id')
  }
}
