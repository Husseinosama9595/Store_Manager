import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Login } from './component/login/login';
import { Notfound } from './component/notfound/notfound';
import { Register } from './component/register/register';
import { Addproduct } from './products/addproduct/addproduct';
import { ProductList } from './products/product-list/product-list';
import { ProductDetails } from './products/product-details/product-details';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    
    {path:"home",component:Home},

    {path:"register",component:Register},

    {path:"login",component:Login},

    {path: "products",
    loadComponent: () =>
      import("./products/products").then((c) => c.Products),

    children: [

      {path: "", redirectTo: "productlist", pathMatch: "full" },

      {path: "addproduct", component: Addproduct },

      {path: "productlist", component: ProductList },

      {path:"productdetails/:id",component:ProductDetails},

      {path:"**",component:Notfound}


    ]
  },
    {path:"**",component:Notfound}
];
