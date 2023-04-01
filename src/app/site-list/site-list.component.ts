import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';
@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {

  allSites !: Observable<Array<any>>
  siteName  !:string 
  siteURL !: string
  siteImgURL !: string
  siteId !: string

  formState : string = "Ajouter un nouveau"
  isSuccess: boolean = false
  successMessage !: string

  constructor(private passwordManagerService:  PasswordManagerService){
    this.loadSites()
  }

  showAlert(message: string){
    this.isSuccess = true
    this.successMessage = message
  }

  onSubmit(values: object) {

    if (this.formState == "Ajouter un nouveau") {
      this.passwordManagerService.ajouterSite(values)
      .then(() => {
        this.showAlert("Nouveau site enregistré avec succes")
      })
      .catch((err)=> {
        console.log(err)
      })
    } else if (this.formState = "Modifier le"){
      this.passwordManagerService.updateSite(this.siteId, values)
      .then(()=>{
        this.showAlert("Mise à jour des informations du site")
      })
      .catch((err)=> {
        console.log(err)
      })
    }    
  }

  loadSites(){
    this.allSites = this.passwordManagerService.loadSites()
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string , id: string){

    this.siteName = siteName
    this.siteURL = siteURL
    this.siteImgURL = siteImgURL
    this.siteId = id

    this.formState = "Modifier le"

  }

  deleteSite(id: string) {
    this.passwordManagerService.deleteSite(id)
    .then(()=>{
      this.showAlert("Site supprimé !")
    })
    .catch((err)=> {
      console.log(err)
    })
  }
}
