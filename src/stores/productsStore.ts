import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class ProductsStore {
  @observable loading: boolean = true;
  @observable addStatus:boolean = false;
  @observable products: any = [];
  @observable total: number = 0;
  @observable errorMessage: string = '';
  @observable pageNum = 0;
  @observable pageQuantity = 10
  @observable search = ''
  constructor() {
    makeObservable(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.setAddStatus = this.setAddStatus.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }

  @action fetchProducts(): void {
    if(this.search == ''){
      axios
      .get(`https://dummyjson.com/products?limit=${this.pageQuantity}&skip=${this.pageNum * this.pageQuantity}`)
      .then((response) => {
        this.onFetchSuccess(response);
      })
      .catch((err) => {
        this.onFetchError(err);
      });
    } else{
      axios
      .get(`https://dummyjson.com/products/search?q=${this.search}`)
      .then((response) => {
        this.onFetchSuccess(response);
      })
      .catch((err) => {
        this.onFetchError(err);
      });
    }
  }

  @action onFetchSuccess(response: any): void {
    this.products = response.data.products;
    this.total = response.data.total;
    this.loading = false;
  }

  @action onFetchError(error: string): void {
    this.errorMessage = error;
    this.loading = false;
  }
  @action.bound handleChangePage (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
    this.pageNum = newPage
  };
  @action.bound handleChangeQuantity(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    this.pageQuantity = parseInt(event.target.value, 10)
    this.pageNum = 0
  }
  @action handleChangeSearch(search:string):void{
    this.search = search
    this.fetchProducts()
  }

  @action setAddStatus(status:boolean){
    this.addStatus = status
  }

  @action addProduct(product:Array<string> | {}){
    axios
    .post(`https://dummyjson.com/products/add`, product)
    .then((response) => {
      if(response.status == 200)
        this.setAddStatus(true)
    })
    .catch((err) => {
      this.onFetchError(err);
    });
  }
}

const productsStore = new ProductsStore();
export default productsStore;
