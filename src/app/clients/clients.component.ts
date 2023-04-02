import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ClientsService } from './services/clients.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IClient } from './interfaces/IClient';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  listClients: IClient [] = [];
  totalTable: number = 0;
  pageSize: number = 5;
  pageIndex: number = 1;
  loadingTable: boolean = false;

  filters: any = {
    sharedKey: ""
  }

  clientFormInitial: IClient = {} as IClient;

  // validations
  modalForm = new FormGroup({
    id : new FormControl(this.clientFormInitial.id),
    sharedKey: new FormControl(this.clientFormInitial.sharedKey),
    name: new FormControl(this.clientFormInitial.name, [Validators.required]),
    phone: new FormControl(this.clientFormInitial.phone, [Validators.required]),
    email: new FormControl(this.clientFormInitial.email, [Validators.required, Validators.email]),
    creationDate: new FormControl(this.clientFormInitial.creationDate)
  });

  get clientName() { return this.modalForm.get('name'); }
  get clientPhone() { return this.modalForm.get('phone'); }
  get clientEmail() { return this.modalForm.get('email'); }

  modalVisible: boolean = false;
  modalTitle: string = "";
  isOkLoading: boolean = false;

  constructor(private clientsService: ClientsService,
              private message: NzMessageService) { 
              
  }

  ngOnInit(): void {
  }

  onTableParamsChange (params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;

    this.searchClients(false);
  }

  searchClients(start) {
    if (start) {
      this.pageIndex = 1;
    }

    this.loadingTable = true;
    this.clientsService.getClientsByFilters(this.filters).subscribe(
      (data) => {
        
          let clients: any = data;
          this.listClients = clients.map((item): IClient => {
            return {
                id: item.id,
                sharedKey: item.sharedKey,
                name: item.name,
                email: item.email,
                phone: item.phone,
                creationDate: item.creationDate
            }
          });
          this.loadingTable = false;
        
        },
        err => {
          this.message.create('error', err.message);
        }
    );
    
  }

  cleanClientForm () {
    this.isOkLoading = false;
    this.modalForm.reset(this.clientFormInitial);
  }

  saveClient() {
    this.isOkLoading = true;
    const formData = this.modalForm.value as IClient;
    this.clientsService.saveClient(formData).subscribe(
      (data) => {
        this.isOkLoading = false;
        this.modalVisible = false;
        this.message.create('success', 'Client Saved');
        this.searchClients(true);
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

  showModal(client: IClient = null) {
    this.cleanClientForm();
    if (client != null) {
      this.modalForm.setValue(client);
    }
    this.modalVisible = true;
  }

  exportClients() {
    this.clientsService.getAllClients().subscribe(
      (data) => {
          let clients: any = data;
          const worksheet = XLSX.utils.json_to_sheet(clients);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
          const blob = new Blob([excelBuffer], { type: 'text/csv;charset=UTF-8' });
          FileSaver.saveAs(blob, "clients.csv");
        },
        err => {
          this.message.create('error', err.message);
        }
    );
    
  }

}
