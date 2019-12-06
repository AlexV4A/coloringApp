import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  
  registerForm: FormGroup;
  errorText : string;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private commonService : CommonService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.errorText = '';
    let formValue = JSON.parse(JSON.stringify(this.registerForm.value, null, 4));
    this.commonService.checkLogin(formValue.name, formValue.password).subscribe((res) => {
      if(res){
        this.router.navigate(['/dashboard']);
      }
      else {
        this.errorText = 'Invalid Login. please try again'
      }
    });
}

}
