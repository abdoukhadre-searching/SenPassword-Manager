import { Component } from '@angular/core'
import { PasswordManagerService } from '../password-manager.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isError : boolean = false

  constructor(private passwordManagerService: PasswordManagerService, private router: Router) {}

  onSubmit(value: any) {
    this.passwordManagerService.login(value.email, value.password)
    .then(() => {
      this.router.navigate(["/site-list"])
    })
    .catch((err)=> {
      this.isError = true
    })
  }
}
