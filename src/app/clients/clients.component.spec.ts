import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsComponent ],
      imports: [HttpClientTestingModule, NzMessageModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button to open client modal', () => {
    const fixture = TestBed.createComponent(ClientsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div div button').textContent).toContain('New');
  });

  it('should render client table', () => {
    const fixture = TestBed.createComponent(ClientsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('nz-table thead th').textContent).toContain('Shared Key');
  });

});
