import { Component, OnInit } from '@angular/core';\
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      id: {
        title: 'ID',
        filter: false,
        editable: false
      },
      name: {
        title: 'Full Name',
        placeholder: 'Search by name'
      }
    }
  };

  source: LocalDataSource; // add a property to the component
  arrData: any[] = [
    {
      id: 1,
      name: "Leanne Graham",
    },
    {
      id: 2,
      name: "Ervin Howell",
    },

    {
      id: 11,
      name: "Nicholas DuBuque",
    }
  ];


  constructor() { 
    this.source = new LocalDataSource(this.arrData); // create the source
  }

  ngOnInit() {
  }

  onCreateConfirm(e) {
    console.log('create ', e);
    e.confirm.resolve(e.newData);
  }

}
