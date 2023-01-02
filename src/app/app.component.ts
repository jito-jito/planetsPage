import { Component } from '@angular/core';
import { animate, trigger, transition, style, query, animateChild, group } from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> planetPage', [
        // query(':enter', [
        //   style({ opacity: 0 }),
        //   animate('.3s ease', style({ opacity: 1 }))
        // ])
        query(':enter', animateChild()),
        query(':leave', animateChild())
      ])
    ]),

  ]
})
export class AppComponent {
  title = 'planetsSite';

  constructor( private routeContexts: ChildrenOutletContexts) {

  }

  getRouteAnimationData() {
    // console.log(this.routeContexts.getContext('primary')?.route?.snapshot?.data?.['animation'])
    return this.routeContexts.getContext('primary')?.route?.snapshot?.data?.['animation']
  }
}
