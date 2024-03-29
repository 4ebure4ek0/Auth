import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class CurrenciesStore {
  @observable loading: boolean = true;
  @observable pairs: string[] = [];
  @observable errorMessage: string = '';
  constructor() {
    makeObservable(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.onFetchError = this.onFetchError.bind(this);
  }

  @action fetchCurrencies(): void {
    axios
      .get('https://www.binance.com/api/v3/ticker/24hr')
      .then((response) => {
        this.onFetchSuccess(response);
      })
      .catch((err) => {
        this.onFetchError(err);
      });
  }

  @action onFetchSuccess(response: any): void {
    this.pairs = response.data;
    this.loading = false;
  }

  @action onFetchError(error: string): void {
    this.errorMessage = error;
    this.loading = false;
  }
}

const currenciesStore = new CurrenciesStore();
export default currenciesStore;
