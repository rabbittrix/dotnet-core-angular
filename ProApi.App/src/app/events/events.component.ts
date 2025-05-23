import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventService } from '../_services/event.service';
import { Event } from '../_models/Event';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';
defineLocale('en-us', enGbLocale);

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  title = 'Events';
  eventsFiltered: Event[];
  events: Event[];
  event: Event;
  modoSave = 'post';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;
  bodyDeleteEvent = '';

  file: File;
  fileNameToUpdate: string;
  currentDate: string;

  // tslint:disable-next-line: variable-name
  _filterList = '';

  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
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

  editEvent(event: Event, template: any){
    this.modoSave = 'put';
    this.openModal(template);
    this.event = Object.assign({}, event);
    this.fileNameToUpdate = event.imageUrl.toString();
    this.event.imageUrl = '';
    this.registerForm.patchValue(this.event);
  }

  newEvent(template: any){
    this.modoSave = 'post';
    this.openModal(template);
  }

  deleteEvent(event: Event, template: any) {
    this.openModal(template);
    this.event = event;
    this.bodyDeleteEvent = `Are you sure you want to delete the Event: Code: ${event.id}, ${event.theme}`;
  }

  confirmDelete(event: Event, template: any) {
    this.eventService.deleteEvent(this.event.id).subscribe(
      () => {
          template.hide();
          this.getEvents();
          this.toastr.success('Successfully deleted');
        }, error => {
          this.toastr.error('Error when trying to Delete');
          console.log(error);
        }
    );
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

  onFileChange(event){
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
      console.log(this.file);
    }
  }

  uploadImage() {
    if (this.modoSave === 'post') {
      const fileName = this.event.imageUrl.split('\\', 3);
      this.event.imageUrl = fileName[2];

      this.eventService.postUpload(this.file, fileName[2])
        .subscribe(
          () => {
            this.currentDate = new Date().getMilliseconds().toString();
            this.getEvents();
          }
        );
    } else {
      this.event.imageUrl = this.fileNameToUpdate;
      this.eventService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
          () => {
            this.currentDate = new Date().getMilliseconds().toString();
            this.getEvents();
          }
        );
    }
  }

  saveChange(template: any){
    if (this.registerForm.valid){
      if (this.modoSave === 'post'){
          this.event = Object.assign({}, this.registerForm.value);

          this.uploadImage();

          this.eventService.postEvent(this.event).subscribe(
          (newEvent: Event) => {
            template.hide();
            this.getEvents();
            this.toastr.success('Successfully inserted!');
          }, error => {
            this.toastr.error(`Error inserted: ${error}`);
          }
        );
      } else {
        this.event = Object.assign({ id: this.event.id }, this.registerForm.value);

        this.uploadImage();

        this.eventService.putEvent(this.event).subscribe(
          () => {
            template.hide();
            this.getEvents();
            this.toastr.success('Successfully edited');
          }, error => {
            this.toastr.success(`Error edited: ${error}`);
          }
        );
      }
    }
  }

  getEvents(){
    this.currentDate = new Date().getMilliseconds().toString();
    this.eventService.getAllEvent().subscribe(
      // tslint:disable-next-line: variable-name
      (_events: Event[]) => {
      this.events = _events;
      this.eventsFiltered = this.events;
    }, error => {
      this.toastr.success(`Error trying to load events: ${error}`);
    });
  }

}
