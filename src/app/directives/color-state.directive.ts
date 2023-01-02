import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorState]'
})

// use to set border color in li elements
// use to set background color in buttons
export class ColorStateDirective {
  @Input() selectedPlanet: string = ''
  @Input() selectedCategory: string = ''
  @Input() currentCategory: string = ''

  constructor(
    private element: ElementRef
  ) { }
    
  ngOnChanges() {
    const elementId = this.element.nativeElement.id
   
    if(elementId.includes('mobile')) {
      this.mobileStyles(elementId)
    }
    if(elementId.includes('desktop')) {
      this.desktopStyles(elementId)
    }

   
  }
  
  getColor(planetName: string) {
    switch(planetName) {
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

  mobileStyles(elementId: string) {
    switch(elementId) {
      case 'mobile-categoryContainer': {
        const linkElement = this.element.nativeElement.querySelector('a')

        if(this.currentCategory === this.selectedCategory) {
          this.element.nativeElement.style.borderBottom =`4px solid ${this.getColor(this.selectedPlanet)}`
          linkElement.style.color = this.getColor('bright')
        } else {
          this.element.nativeElement.style.borderBottom =`none`
          linkElement.style.color = this.getColor('lightDark')
        }
        break;
      }
    }
  }
  desktopStyles(elementId: string) {
    switch(elementId) {
      case "desktop-categoryContainer": {
        const indexElement = this.element.nativeElement.querySelector('.desktopCategory-link-number')
        if(this.currentCategory === this.selectedCategory) {
          this.element.nativeElement.style.backgroundColor = this.getColor(this.selectedPlanet)
          indexElement.style.color = this.getColor('bright')
        } else {
          this.element.nativeElement.style.backgroundColor = 'transparent'
          indexElement.style.color = this.getColor('lightDark')
        }
        break;
      }
      case 'desktop-menuLink': {
        if(this.currentCategory === this.selectedCategory) {
          this.element.nativeElement.style.borderBottom = `3px solid ${this.getColor(this.currentCategory)}`
        } else {
          this.element.nativeElement.style.borderBottom = `none`
        }
       
      }
    }
  }
}
