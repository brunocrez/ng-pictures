import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[darkenOnHover]'
})
export class DarkenOnHoverDirective {

    constructor(
        private element: ElementRef<any>,
        private render: Renderer
    ) { }

    @HostListener('mouseover')
    darkenOn() {
        this.render.setElementStyle(this.element.nativeElement, 'filter', 'brightness(70%)');
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setElementStyle(this.element.nativeElement, 'filter', 'brightness(100%)');
    }
}