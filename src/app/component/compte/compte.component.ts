import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { Compte } from 'src/app/model/Compte';
import { ClientService } from 'src/app/service/clientservice/client.service';
import { CompteService } from 'src/app/service/compteservice/compte.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css'],
})
export class CompteComponent implements OnInit {
  paramsCin: any;
  dataComptes!: any;
  client!:Client;
  firstName!:String;lastName!:String;
  accountForm!: FormGroup;
  compteplus:Compte = new Compte;
 constructor(private route: ActivatedRoute,private compteService: CompteService,private clientService:ClientService,private dialog:MatDialog) {}
  displayedColumns: string[] = ['rang', 'rib','cin', 'solde','action'];

  ngOnInit(): void {
    //get the Cin from the previous page 
    this.route.queryParams.subscribe((params) => {
      this.paramsCin = +params['cin'];
      
      this.compteService.getAccountsByCin(this.paramsCin).subscribe((comptes) => {
          this.dataComptes = new MatTableDataSource<Compte>(comptes);
        });

      this.clientService.getClient(this.paramsCin).subscribe(client=>{
        this.client=client;
        this.firstName=client.prenom;
        this.lastName=client.nom;
        this.paramsCin=client.cin
      })
    });

    this.initFormaddAccount();
  }

  initFormaddAccount(){
    this.accountForm = new FormGroup({
      cin: new FormControl(''),
      prenom: new FormControl(''),
      nom: new FormControl(''),
      solde: new FormControl(''),
      rib:new FormControl('')
    }) 
  }
  addError!:String;
  addAccount(){
    this.compteService.addAccount(this.paramsCin,this.accountForm.value.solde).subscribe(
      (response) => {
        console.log('Compte saved successfully:', response);
        window.location.reload()
      },
      (error) => {
        console.error('Error saving compte:', error);
        this.addError='add Solde'
      }
    );
  }
  editSolde!:string;
  editAccount(){
    const updatedCompte:Compte={
      rib: 0,
      solde: this.accountForm.value.solde,
      client: new Client
    }
    this.compteService.updateAccount(this.compteplus.rib,updatedCompte).subscribe(response=>{
      console.log(response);
      window.location.reload();
    });


  }

  setRib(compte: Compte) {
    this.compteplus.rib=compte.rib;
    this.compteplus.solde=compte.solde;
  }

  isRowHovered = false;
  onRowHover(hovered: boolean) {
    this.isRowHovered = hovered;
  }
  

  deleteCompte() {
    this.compteService.deleteCompte(this.compteplus.rib).subscribe(response => {
      console.log(response);
      window.location.reload();
    })
  }
  applyFilter(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataComptes.filter = filterValue.trim().toLowerCase();
  }
}
