import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { ActivationEnd, Router } from '@angular/router';
import { PlanetsCatDTO } from '../../models/planetsCatDTO.model'
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: PlanetsCatDTO[] = []
  openMenu: Boolean = false

  selectedCategory: string = ''
  constructor( 
    private router: Router,
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe(categories => {
      this.categories = categories as PlanetsCatDTO[]
    })

    // we can't receive params in a component outside router outlet

    // this.route.paramMap.subscribe(params => {
    //   let id = params.get('id') as string
      // if(id) {
      //   let currentcategory = this.categories.find(category => category.id === parseInt(id))

      //   if(currentcategory) {
      //     this.selectedCategory = currentcategory.name 
      //   }
      // } else {
      //   console.log('dfgfd')
      // }
    // })

    this.router.events
    .pipe(
      filter(e => (e instanceof ActivationEnd) && (Object.keys(e.snapshot.params).length > 0)),
      map(e => e instanceof ActivationEnd ? e.snapshot.params : {})
    )
    .subscribe((params)=> {
      let id = params['id'] as string
      if(id) {
          let currentcategory = this.categories.find(category => category.id === parseInt(id))

          if(currentcategory) {
            this.selectedCategory = currentcategory.name 
          }
      }
    });
  }

  toggleMenu() {
    this.openMenu = !this.openMenu
  }

  onChangePlanet(planetName: string) {
    this.selectedCategory = planetName
 
  }

  getcolor(categoryName: string) {
    switch(categoryName) {
      case '': 
        return '#FFF'
      case 'lightDark':
        return '#38384F'
      case 'Mercury':
        return '#419EBB'
      case 'Venus':
        return '#EDA249'
      case 'Earth':
        return '#6f2ed6'
      case 'Mars':
        return '#D14C32'
      case 'Jupiter':
        return '#D83A34'
      case 'Saturn':
        return'#CD5120'
      case 'Uranus':
        return '#1EC1A2'
      case 'Neptune':
        return '#2D68F0'
      default :
        return '#FFF'
    }
  }
}
