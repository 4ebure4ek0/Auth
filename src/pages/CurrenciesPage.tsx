import { observer } from 'mobx-react';
import { Navigate } from 'react-router';
import { useEffect } from 'react';

interface IPropStore {
  isLoggedIn: boolean;
}
interface IPropCurrencies {
  loading: boolean;
  pairs: string[];
  errorMessage: string;
  fetchCurrencies: () => void;
}
interface IProps {
  store: IPropStore;
  currencies: IPropCurrencies;
}
const CurrenciesPage = observer((props: IProps) => {
  useEffect(() => {
    props.currencies.fetchCurrencies();
  }, []);
  if (props.currencies.loading) {
    return (
      <div className="container_page">
        <div className="loading"></div>
      </div>
    );
  } else {
    return (
      <div className="container_page">
        {props.store.isLoggedIn ? null : <Navigate to="/" />}
        <table>
          <tbody>
            <tr>
              <td>
                <h3>Symbol</h3>
              </td>
              <td>
                <h3>Bid Price</h3>
              </td>
              <td>
                <h3>Ask Price</h3>
              </td>
            </tr>
            {props.currencies.pairs.map((pair: any) => {
              return (
                <tr key={pair.symbol}>
                  <td>{pair.symbol}</td>
                  <td>{pair.bidPrice}</td>
                  <td>{pair.askPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
});

export default CurrenciesPage;
