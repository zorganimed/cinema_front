import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements  OnInit{

  public villes:any;
  public cinemas:any;
  public currentVille:any;
  public currentCinema:any;
  public salles: any;

  constructor(public cinemaService:CinemaService) {
  }

  ngOnInit(): void  {
    this.cinemaService.getVilles()
      .subscribe(data=>{
        this.villes=data;

      },err=>{
        console.log(err);

    });
  }


  onGetCinemas(v: any) {
    this.currentVille = v;
    this.cinemaService.getCinemas(v)
      .subscribe(data=>{
        this.cinemas=data;

      },err=>{
        console.log(err);

      });
  }

  onGetSalles(c: any) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
      .subscribe(data=>{
        this.salles=data;
        this.salles._embedded.salles.forEach((salle:any)=>{
          this.cinemaService.getProjections(salle)
            .subscribe(data=>{
              salle.projections=data;

            },err=>{
              console.log(err);

            })
        })

      },err=>{
        console.log(err);

      });

  }

  onGetPlaces(p: any) {

  }
}
