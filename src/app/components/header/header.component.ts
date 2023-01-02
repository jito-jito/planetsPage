import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { ActivatedRoute } from '@angular/router';
import { PlanetsCatDTO } from '../../models/planetsCatDTO.model'


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
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe(categories => {
      this.categories = categories as PlanetsCatDTO[]
    })
    this.route.paramMap.subscribe(params => {
      let id = params.get('id') as string
      if(id) {
        let currentcategory = this.categories.find(category => category.id === parseInt(id))

        if(currentcategory) {
          this.selectedCategory = currentcategory.name 
        }
      }
    })
  }

  toggleMenu() {
    this.openMenu = !this.openMenu
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
