import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    
    {path:"home",
      loadComponent:()=>
      import("./component/home/home").then((c)=>c.Home)
      
    },
    {path:"cart",loadComponent:()=>import("./component/shopping-cart/shopping-cart").then((c)=>c.ShoppingCart)},

    {path:"register",loadComponent:()=>import("./component/register/register").then((c)=>c.Register)},

    {path:"login",loadComponent:()=>import("./component/login/login").then((c)=>c.Login)},

    {path: "products",
    loadComponent: () =>
      import("./products/products").then((c) => c.Products),

      children: [

        {path: "", redirectTo: "productlist", pathMatch: "full" },

        {path: "addproduct",loadComponent:()=>import("./products/addproduct/addproduct").then((c)=>c.Addproduct) },

        {path: "productlist",loadComponent:()=>import("./products/product-list/product-list").then((c)=>c.ProductList) },

        {path:"productdetails/:id",loadComponent:()=>import("./products/product-details/product-details").then((c)=>c.ProductDetails)},

        {path:"**",loadComponent:()=>import("./component/notfound/notfound").then((c)=>c.Notfound)}


      ]
  },
    {path:"**",loadComponent:()=>import("./component/notfound/notfound").then((c)=>c.Notfound)}
];
