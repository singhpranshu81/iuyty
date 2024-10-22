import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  dummyOrder = {
    orderId: 1,
    orderDate: new Date().toISOString(),
    orderStatus: 'Success',
    cart: {
      cartId: 1
    }
  };  
  carty: any = {};
   
  constructor(private cartService:CartService,private orderService:OrderService,private router:Router) { } 
 totalPrice = localStorage.getItem('totalPrice');
 userName = JSON.parse(localStorage.getItem('user') || '{}').fullName;
 userId= JSON.parse(localStorage.getItem('user') || '{}').customerId;
 emailId= JSON.parse(localStorage.getItem('user') || '{}').email;
  ngOnInit(): void {
    this.cartService.getCartbyId(1).subscribe( //change here user.id
      (data: any) => {
        this.carty = data;
        console.log(this.carty); 
      },
      (error) => {
        console.error('Error fetching cart:', error); 
      }
    );

    this.orderService.updateOrder(this.dummyOrder).subscribe( 
      (data: any) => {
        console.log('Order updated:', data); 
      },
      (error) => {
        console.error('Error updating order:', error); 
      }
    );
  } 
  download(){
       
  }

  email(){
    
    emailjs.send('service_3ccghdr', 'template_hfzwem2', {
      date: new Date().toISOString(),
      name:this.userName,
      price:this.totalPrice,
     email:this.emailId
    },{
      publicKey: 'l_8NkYnlAjt3gNZ0h'
    }).then((response)=> {
      
      console.log('SUCCESS!', response.status, response.text);
      window.alert("Order sent successfully...")
      this.router.navigate(['/dashboard']);
    });
  }

}
