import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

form: FormGroup;
usuario: any;

  constructor(private fb:FormBuilder,
              private toastr: ToastrService,
              private _LoginService = LoginService ) 
              { 
                this.form = this.fb.group({
                  Usuario:['',Validators.required],
                  Password:['',Validators.required]
                })
              }


  ngOnInit(): void {
  }

  loginuser(){
    this._LoginService.login(this.usuario).subscribe(data =>{
      this.toastr.success("login","exito");
    },error =>{
      this.toastr.error("error","login fail")
    });
  }


}
