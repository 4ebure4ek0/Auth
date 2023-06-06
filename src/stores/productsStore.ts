import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class ProductsStore {
  @observable loading: boolean = true;
  @observable products: Array<string> = [];
  @observable errorMessage: string = '';
  @observable pageNum = 0
  constructor() {
    makeObservable(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
  }

  @action fetchProducts(): void {
    axios
      .get(`https://dummyjson.com/products?limit=30&skip=${this.pageNum * 30}`)
      .then((response) => {
        this.onFetchSuccess(response);
      })
      .catch((err) => {
        this.onFetchError(err);
      });
  }

  @action onFetchSuccess(response: any): void {
    this.products = response.data;
    this.loading = false;
  }

  @action onFetchError(error: string): void {
    this.errorMessage = error;
    this.loading = false;
  }
}

const productsStore = new ProductsStore();
export default productsStore;
