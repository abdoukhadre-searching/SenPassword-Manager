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

  constructor(private passwordManagerService:  PasswordManagerService){
    this.loadSites()
  }

  onSubmit(values: object) {

    if (this.formState = "Ajouter un nouveau") {
      this.passwordManagerService.ajouterSite(values)
      .then(() => {
        console.log("Infos for this website add ")
      })
      .catch((err)=> {
        console.log(err)
      })
    } else if (this.formState = "Modifier le"){
      this.passwordManagerService.updateSite(this.siteId, values)
      .then(()=>{
        console.log("Infos for this website update successfully")
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
}
