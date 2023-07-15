import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent {
  public productList:any; 
  searchKey:string='';
  public filterCategory:any;

  constructor(private api: ApiService,private cartService: CartService){

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

  }

}
