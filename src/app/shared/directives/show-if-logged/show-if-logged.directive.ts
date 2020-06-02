import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private userService: UserService,
        private element: ElementRef<any>,
        private renderer: Renderer
    ) { }

    ngOnInit() {
        !this.userService.isLoggedIn() && this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    }

}