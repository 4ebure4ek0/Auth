import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class ProductsStore {
  @observable loading: boolean = true;
  @observable products: any = [];
  @observable errorMessage: string = '';
  @observable pageNum = 0;
  @observable search = ''
  constructor() {
    makeObservable(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    this.goNextPage = this.goNextPage.bind(this);
    this.goBackPage = this.goBackPage.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }

  @action fetchProducts(): void {
    if(this.search == ''){
      axios
      .get(`https://dummyjson.com/products?limit=30&skip=${this.pageNum * 30}`)
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
    this.loading = false;
  }

  @action onFetchError(error: string): void {
    this.errorMessage = error;
    this.loading = false;
  }

  @action goNextPage():void{
    this.pageNum += 30
  }
  @action goBackPage(): void | null{
    if(this.pageNum !== 0){
      this.pageNum -= 30
    } else {
      return null
    }
  }
  @action handleChangeSearch(search:string):void{
    this.search = search
    this.fetchProducts()
  }
}

const productsStore = new ProductsStore();
export default productsStore;
