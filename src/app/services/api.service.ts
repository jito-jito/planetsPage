import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanetsCatDTO } from '../models/planetsCatDTO.model';
import { PlanetDTO } from  '../models/planetDTO.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getPlanetById(id: number) {
    return new Observable((observer) => {
      fetch('assets/apiData.json')
      .then(response => response.json())
      .then((results)=> {
        const planetsData = results.planetsData as PlanetDTO[]
        const data = planetsData.find((planet: PlanetDTO) => planet.id === id)
        setTimeout(() => observer.next(data as PlanetDTO), 500)      
      }) 
    })
  }

  getAllCategories() {
    return new Observable(observer => {
      fetch('assets/apiData.json',
      { method: 'GET',
        mode: 'cors',
        cache: 'default' 
      })
      .then(response => response.json())
      .then(results => observer.next(results.planetsCat as PlanetsCatDTO[]))
      .catch(error => {
        console.error(error)
        observer.error(error)
      })
    })
  }

  
}


