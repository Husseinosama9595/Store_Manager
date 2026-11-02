import { ChangeDetectorRef, Component } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductService } from "../productservice";
import { CartService } from "../../services/cart.service";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
export interface Review {
  _id: string;
  user: { name: string };
  rating: number;
  review: string;
}
export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  reviews: Review[];
}
interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
export interface ProductResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}

@Component({
  imports: [RouterLink],
  selector: "app-product-list",
  styleUrl: "./product-list.css",
  templateUrl: "./product-list.html",
})
export class ProductList {
  readonly pageSize = 8;
  productlist: Product[] = [];
  searchTerm = "";
  selectedCategory = "All";
  currentPage = 1;
  private requestedCategory: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  get categories(): string[] {
    return [
      "All",
      ...Array.from(
        new Set(
          this.productlist
            .map((product) => product.category?.name)
            .filter((name): name is string => !!name),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    ];
  }

  get filteredProducts(): Product[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    return this.productlist.filter((product) => {
      const matchesCategory =
        this.selectedCategory === "All" ||
        product.category?.name === this.selectedCategory;
      const searchable = [
        product.title,
        product.brand?.name,
        product.category?.name,
        product.description,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize));
  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  get visibleProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }
  get firstVisibleResult(): number {
    return this.filteredProducts.length
      ? (this.currentPage - 1) * this.pageSize + 1
      : 0;
  }
  get lastVisibleResult(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.filteredProducts.length,
    );
  }

  addToCart(product: Product) {
    this.cartService.add(product);
  }

  setSearch(value: string) {
    this.searchTerm = value;
    this.currentPage = 1;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: category === "All" ? null : category },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });
  }

  private syncCategoryFromQuery() {
    this.selectedCategory =
      this.requestedCategory &&
      this.productlist.some(
        (product) => product.category?.name === this.requestedCategory,
      )
        ? this.requestedCategory
        : "All";
    this.currentPage = 1;
  }

  changePage(page: number) {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  connectToApi() {
    this.productService.getProducts().subscribe({
      next: (result) => {
        this.productlist = result.data ?? [];
        this.syncCategoryFromQuery();
        this.cdr.detectChanges();
      },
      error: (error) => console.error("Could not load products", error),
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.requestedCategory = params.get("category");
      this.syncCategoryFromQuery();
    });
    this.connectToApi();
  }
}
