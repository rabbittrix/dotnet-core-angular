import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventService } from '../_services/event.service';
import { Event } from '../_models/Event';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { templateJitUrl } from '@angular/compiler';
defineLocale('en-us', enGbLocale);

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventsFiltered: Event[];
  events: Event[];
  event: Event;
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;

  // tslint:disable-next-line: variable-name
  _filterList = '';

  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
    ) {
      this.localeService.use('en-us');
  }

  get filterList(): string{
    return this._filterList;
  }
  set filterList(value: string){
    this._filterList = value;
    this.eventsFiltered = this.filterList ? this.filterEvents(this.filterList) : this.events;
  }

  openModal(template: any){
    // this.modalRef = this.modalService.show(template);
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.validation();
    this.getEvents();
  }

  filterEvents(filterFor: string): Event[] {
    filterFor = filterFor.toLocaleLowerCase();
    return this.events.filter(event => {
      return event.theme.toLocaleLowerCase().includes(filterFor);
    });
  }

  removeImage() {
    this.showImage = !this.showImage;
  }

  validation(){
    this.registerForm = this.fb.group({
      theme: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      place: ['', Validators.required],
      dateEvent: ['', Validators.required],
      imageUrl: ['', Validators.required],
      qtdPerson: ['', [Validators.required, Validators.max(200000)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  saveChange(template: any){
    if (this.registerForm.valid){
      this.event = Object.assign({}, this.registerForm.value);
      this.eventService.postEventById(this.event).subscribe(
        (newEvent: Event) => {
          console.log(newEvent);
          template.hide();
          this.getEvents();
        }, error => {
          console.error(error);
        }
      );
    }
  }

  getEvents(){
    this.eventService.getAllEvent().subscribe(
      // tslint:disable-next-line: variable-name
      (_events: Event[]) => {
      this.events = _events;
      this.eventsFiltered = this.events;
      console.log(_events);
    }, error => {
      console.log(error);
    });
  }

}
