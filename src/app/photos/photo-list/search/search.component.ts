import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() queryDescription = new EventEmitter<string>();
  @Input() emptyValue = '';

  public debounce: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(entry => this.queryDescription.emit(entry))
  }

  ngOnDestroy() {
    this.debounce.unsubscribe();
  }

}
