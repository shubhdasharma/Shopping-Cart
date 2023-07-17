import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public totalItem:number = 0;
  public searchTerm : string = '';

  constructor(private cartService:CartService,private scroller: ViewportScroller){

  }

  ngOnInit():void{
   this.cartService.getProducts().subscribe(res=>{
     this.totalItem = res.length;
   })

  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);

  }
  goDown() {
    this.scroller.scrollToAnchor("items");
  }

}
