import { Component, OnInit, ViewChild } from '@angular/core';
import { LoanService } from '../service/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss'],
})
export class ExtraComponent implements OnInit {
  displayedColumns = ['id', 'name', 'type', 'payment', 'due', 'status'];
  getData: any;
  name: any;
  sortedColumn!: string;

  dataSource: any;
  userForm: any;

  constructor(private service: LoanService, private router: Router) {}
  ngOnInit(): void {
    this.service.getData().subscribe((data) => {
      this.getData = data;
    });

    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }
  search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.getData = this.getData.filter((data: any) => {
        return data.name
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    }
  }
  emailValidation: boolean = true;
  isLoggedIn = true;
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: '',
  };
  loginObj: any = {
   
    email: '',
    password: '',
  };

  signUp() {
    this.signupUsers.push(this.signupObj);
    const beforeLength = this.signupUsers.length;

    this.signupUsers = this.signupUsers.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.userName === value.userName &&
            t.email === value.email &&
            t.password === value.password
        )
    );
    const afterLength = this.signupUsers.length;
    if (beforeLength === afterLength) {
      localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
      this.signupObj = {
        userName: '',
        email: '',
        password: '',
      };
    } else {
      alert('already registered');
    }
  }


  
  login(event: any) {
    
    event.preventDefault();
    //this.signupUsers.push(this.loginObj);
    const isUserExist = this.signupUsers.find(
      (m) =>
        m.email == this.loginObj.email && m.password == this.loginObj.password
    );
    if (isUserExist != undefined) {
      alert('login successfully!!');
    //   const beforeLength = this.signupUsers.length;
    //   this.signupUsers = this.signupUsers.filter(
    //     (value, index, self) =>
    //       index ===
    //       self.findIndex(
    //         (t) =>
             
    //           t.email === value.email &&
    //           t.password === value.password
    //       )
    //   );
    //   const afterLength = this.signupUsers.length;
    //   if (beforeLength === afterLength) {
    //   localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    //   this.loginObj = {
        
    //     email: '',
    //     password: '',
    //   };
    // }
      this.router.navigate(['/customer']);
    } else {
      alert('Wrong credentials');
    }
  }
  logout(){
    
  }
}
