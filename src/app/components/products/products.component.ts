import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ViewportScroller } from "@angular/common";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent {
  public productList:any; 
  searchKey:string='';
  public filterCategory:any;
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor(private api: ApiService,private cartService: CartService,private scroller: ViewportScroller){

  }

  ngOnInit():void{
    this.api.getProduct().subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category === "women's clothing" || a.category === "men's clothing"){
           a.category = "fashion";
        }
       Object.assign(a,{quantity:1,total:a.price});
      })
    })
    this.cartService.search.subscribe((val:any) =>{
      this.searchKey = val
    })
  }

  addtocart(item:any){
    this.cartService.addtoCart(item);
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category === category || category === ''){
        return a;
      }
    })

    this.slides[0] = {
      id: 0,
      src: './assets/img/angular.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/img/react.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    this.slides[2] = {
      id: 2,
      src: './assets/img/vue.jpg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }

  }

  goDown() {
    this.scroller.scrollToAnchor("items");
  }

}
