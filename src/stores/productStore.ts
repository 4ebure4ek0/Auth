import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class ProductsStore {
  @observable loading: boolean = true;
  @observable product: Array<string> | {} = {};
  @observable errorMessage: string = '';
  constructor() {
    makeObservable(this);
    this.fetchProduct = this.fetchProduct.bind(this)
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
  }

  @action fetchProduct(id:string): void {
    axios
    .get(`https://dummyjson.com/products/${id}`)
    .then((response) => {
        this.onFetchSuccess(response)
        })
    .catch((err) => {
      this.onFetchError(err);
    });
  }

  @action onFetchSuccess(response: any): void {
    this.product = response.data;
    this.loading = false;
  }

  @action onFetchError(error: string): void {
    this.errorMessage = error;
    this.loading = false;
  }
}

const productsStore = new ProductsStore();
export default productsStore;
