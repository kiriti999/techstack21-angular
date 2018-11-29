import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-edit-page',
  templateUrl: './blog-edit-page.component.html',
  styleUrls: ['./blog-edit-page.component.scss']
})
export class BlogEditPageComponent implements OnInit {
  routeId: any;
  title: any;
  details: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeId = params.id;
      this.title = params.title;
      this.details = params.details;
      console.log('params', params);
    });


  }

  onBlogEdit(e) {
    console.log('event ', e.target.id);
  }
}
