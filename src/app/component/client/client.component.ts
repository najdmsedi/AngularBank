import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/service/clientservice/client.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  dataClients!: any;
  ClientForm!: FormGroup;
  ClientEditForm!: FormGroup;
  cinForUpdate!: string;
  constructor(private clientService: ClientService, private router: Router) {}
  displayedColumns: string[] = ['rang', 'cin', 'nom', 'prenom', 'action'];


  ngOnInit() {
    this.loadClients();
    this.initFormAddAccount();
    this.initFormEditAccount()
 
  }

  
  applyFilterAuto(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue !== "") {
      this.dataClients = this.dataClients.filter((client:Client) =>{
        client.cin.toLowerCase().includes(filterValue.toLowerCase()) 
        client.prenom.toLowerCase().includes(filterValue) 
        client.nom.toLowerCase().includes(filterValue)
      }
      );
    } else {
      this.loadClients();
    }
  }
  initFormAddAccount() {
   this.ClientForm = new FormGroup({
    prenom: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required)
  });
  }

  initFormEditAccount() {
    this.ClientEditForm = new FormGroup({
      prenom: new FormControl(),
      nom: new FormControl(),
      cin:new FormControl()
    });
  }
  loadClients() {
    this.clientService.getClients().subscribe((clients) => {
      console.log(clients);
      this.dataClients = new MatTableDataSource<Client>(clients);
    });
  }

  isRowHovered = false;
  onRowHover(hovered: boolean) {
    this.isRowHovered = hovered;
  }

  onClientClick(row: any) {
    const data = { cin: row.cin };
    const navigationExtras: NavigationExtras = {
      queryParams: data,
    };
    this.router.navigate(['/compte'], navigationExtras).then(() => {
      window.location.reload();
    });
  }
  prenomrerror!:string;
  cinrerror!:string;
  nomerror!:string;
  addClient() {
    if (this.ClientForm.valid) {
      const client: Client = {
        cin: this.ClientForm.value.cin,
        nom: this.ClientForm.value.nom,
        prenom: this.ClientForm.value.prenom,
      };
    
      this.clientService.addClient(client).subscribe(
        (response) => {
          console.log(response);
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    } 
    else {
      if(this.ClientForm.value.cin==''){
        this.cinrerror="cin required"
      }  
     
      if(this.ClientForm.value.prenom==''){
        this.prenomrerror="prenom required"
      } 
  
      if(this.ClientForm.value.nom==''){
        this.nomerror="nom required"
      }

    }
  }
  

  prenom:string='';
  nom:string='';
  setCin(client: Client) {
    this.prenom=client.prenom;
    this.nom=client.nom;

    this.cinForUpdate = client.cin;
    console.log(this.cinForUpdate)
  }
  editClient() {
    if (this.ClientEditForm.valid) {

    const client:Client={
      cin: '',
      nom: this.ClientEditForm.value.nom,
      prenom: this.ClientEditForm.value.prenom
    }
    console.log(client)
    this.clientService.updateClient(this.cinForUpdate, client).subscribe((response) => {
      console.log(response);
      window.location.reload();
    });

  }
  else {

    if(this.ClientForm.value.prenom==''){
      this.prenomrerror="prenom required"
    } 

    if(this.ClientForm.value.nom==''){
      this.nomerror="nom required"
    }

  }
  }

  deleteClient() {
    this.clientService.deleteClient(this.cinForUpdate).subscribe(response => {
      console.log(response);
      window.location.reload();
    })
  }

  applyFilter(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataClients.filter = filterValue.trim().toLowerCase();
  }
  
}
