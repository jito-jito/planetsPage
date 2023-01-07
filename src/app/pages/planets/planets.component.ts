import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger, query, AnimationEvent  } from '@angular/animations';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { PlanetDTO, PlanetStructure } from 'src/app/models/planetDTO.model';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  animations: [
    // trigger('loadData', [
    //   state('loading', style({
    //     opacity: 0
    //   })),
    //   state('loaded', style({
    //     opacity: 1
    //   })),
    //   transition('loading => loaded', [
    //     animate('3s')
    //   ]),
    //   transition('loaded => loading', [
    //     animate('2s')
    //   ])
    // ])
    trigger('loadingContent', [
      // transition(':enter', [
      //   style({ opacity: 0 }),
      //   animate('150ms', style({opacity: 1}))
      // ]),
      // transition(':leave', [
      //   style({ 
      //     opacity: 1,
      //     transform: 'translate(0)'
      //   }),
      //   animate('200ms', style({ 
      //     opacity: 0,
      //     transform: 'translate(-100%)'
      //   }))
      // ])
      transition(':enter', [
        query(':self', style({ opacity: 0 })),
        query(':self', animate('200ms', style({ opacity: 1 })) )
        
      ]),
      transition(':leave', [
        query(':self', style({ opacity: 1 }) ),
        query(':self', animate('200ms', style({ opacity: 0 })) )
      ]),
    ]),


    trigger('changeContent', [
      transition(':enter', [
        query(':self', style({ opacity: 0 })),
        query(':self', animate('200ms', style({ opacity: 1 })) )
        
      ]),
      transition(':leave', [
        query(':self', style({ opacity: 1 }) ),
        query(':self', animate('200ms', style({ opacity: 0 })) )
      ]),
      // transition('changeIn <=> changeOut', [
      //     animate('150ms')
      // ]),
    ])
  ]
})
export class PlanetsComponent implements OnInit {
  planet: PlanetDTO = {
    id: 0,
    name: '',
    overview: {
      content: '',
      source: ''
    },
    structure: {
      content: '',
      source: ''
    },
    geology: {
      content: ''
    },
    rotation: '',
    revolution: '',
    radius: '',
    temperature: '',
    images: {
      planet: '',
      internal: '',
      geology: ''
    }
  }
  categories: string[] = ['overview', 'structure', 'surface']

  selectedCategory: 'surface' | 'overview' | 'structure' = 'overview';
  selectedPlanet: string = this.planet.name
  selectedData: PlanetStructure = {
    content: '',
    source: ''
  }

  loading = true 
  changeDataLoading = false

  constructor(
    private location: Location,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.loading = true
    this.location.go('.', 'category=overview')

    this.route.paramMap.subscribe((params) => {
      this.loading = true
      const planetId = parseInt(params.get('id') as string)


      this.apiService.getPlanetById(planetId).subscribe((data) => {
        const planetdata = data as PlanetDTO
        this.planet = planetdata

        this.selectedPlanet = this.planet.name

        this.route.queryParamMap.subscribe(querys => {
          this.changeDataLoading = true

          this.selectedCategory  = querys.get('category') as 'surface' | 'overview' | 'structure'

          setTimeout(() => {
            switch(this.selectedCategory) {
              case 'overview':
              case 'structure':
                this.selectedData = this.planet[this.selectedCategory] as PlanetStructure
                break;
              case 'surface':
                this.selectedData = this.planet['geology'] as PlanetStructure
                break;

            }
            this.loading = false
            this.changeDataLoading = false
          }, 400)
        })
      })

    })
  

  }

  onAnimationEvent(event: AnimationEvent) {
    console.log(event)
  }

}
