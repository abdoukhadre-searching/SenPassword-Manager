import { Component } from '@angular/core'
import { user } from '@angular/fire/auth'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { PasswordManagerService } from '../password-manager.service'
import {AES, enc} from 'crypto-js'

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  siteId !: string
  siteName !: string
  siteURL !: string
  siteImgURL !: string

  passwordList !: Array<any>

  email !: string
  username !: string
  password !: string
  passwordId !: string

  formState : string = "Ajouter un nouveau"

  isSuccess : boolean = false
  successMessage !: string

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe( (value:any) => {
      this.siteId = value.id
      this.siteName = value.siteName
      this.siteURL = value.siteURL
      this.siteImgURL = value.siteImgURL
    })

    this.loadPasswords()
  }

  showAlert(message: string){
    this.isSuccess = true
    this.successMessage = message
  }

  resetForm() {
    this.email = ""
    this.password = ""
    this.username = ""
    this.formState = "Ajouter un nouveau"
    this.passwordId = ""
  }

  onSubmit(values: any) {

    const enc_pwd = this.encryptPassword(values.password)
    values.password  = enc_pwd

    if (this.formState == "Ajouter un nouveau") {
      this.passwordManagerService.addPassword(values, this.siteId)
    .then(() => {
      this.showAlert('Enregistrement effectué avec succés')
      this.resetForm()
    })
    .catch((err)=> {
      console.log(err)
    })
    } else if ( this.formState = "Modifier") {
      this.passwordManagerService.updatePassword(this.siteId, this.passwordId, values)
    .then((val) => {
      this.showAlert('Mise a jour des informations effectuée')
      this.resetForm()
    })
    .catch((err)=> {
      console.log(err)
    })
    }
    
  }

  loadPasswords() {
    this.passwordManagerService.loadPasswords(this.siteId).subscribe(val => {
      this.passwordList = val
    })
  }

  editPassword(email: string, username: string, password: string, passwordId: string) {
    this.email = email
    this.username = username
    this.password = password
    this.passwordId = passwordId

    this.formState = "Modification "
  }

  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(this.siteId, passwordId)
    .then((val) => {
      this.showAlert("Suppression effectuée")
      this.resetForm()
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  encryptPassword(password:string) {
    const cle_Secret = "7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+"
    const encrypt_password = AES.encrypt(password, cle_Secret).toString()
    return encrypt_password
  }

  decryptPassword(password: string) {
    const cle_Secret = "7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+"
    const decrypt_password = AES.decrypt(password, cle_Secret).toString(enc.Utf8)
    return decrypt_password
  }

  onDecrypt( password: string, index: number) {
    const decrypt_password = this.decryptPassword(password)
    this.passwordList[index].password = decrypt_password
  }

}
