import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventService } from '../_services/event.service';
import { Event } from '../_models/Event';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventsFiltered: Event[];
  events: Event[];
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  modalRef: BsModalRef;

  _filterList = '';
  
  constructor(
    private eventService: EventService,
    private modalService: BsModalService
    ) { }

  get filterList(): string{
    return this._filterList;
  }
  set filterList(value: string){
    this._filterList = value;
    this.eventsFiltered = this.filterList ? this.filterEvents(this.filterList) : this.events;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.getEvents();
  }

  filterEvents(filterFor: string): Event[] {
    filterFor = filterFor.toLocaleLowerCase();
    return this.events.filter(event => {
      return event.theme.toLocaleLowerCase().includes(filterFor)
    });
  }

  removeImage() {
    this.showImage = !this.showImage;
  }

  getEvents(){
    this.eventService.getAllEvent().subscribe(
      (_events: Event[]) => {
      this.events = _events;
      this.eventsFiltered = this.events;
      console.log(_events);
    }, error => {
      console.log(error);
    });
  }

}
