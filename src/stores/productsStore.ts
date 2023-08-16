import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class ProductsStore {
  @observable loading: boolean = true;
  @observable products: any = [];
  @observable total: number = 0;
  @observable errorMessage: string = '';
  @observable pageNum = 0;
  @observable search = ''
  constructor() {
    makeObservable(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
    // this.goNextPage = this.goNextPage.bind(this);
    // this.goBackPage = this.goBackPage.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
    // this.handleChangePage = this.handleChangePage.bind(this)
  }

  @action fetchProducts(): void {
    if(this.search == ''){
      axios
      .get(`https://dummyjson.com/products?limit=25&skip=${this.pageNum * 25}`)
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

  // @action goNextPage():void{
  //   this.pageNum += 30
  // }
  // @action goBackPage(): void | null{
  //   if(this.pageNum !== 0){
  //     this.pageNum -= 30
  //   } else {
  //     return null
  //   }
  // }
  @action.bound handleChangePage (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
    this.pageNum = newPage;
  };
  @action handleChangeSearch(search:string):void{
    this.search = search
    this.fetchProducts()
  }
}

const productsStore = new ProductsStore();
export default productsStore;
