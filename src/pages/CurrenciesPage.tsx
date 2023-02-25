import { observer } from 'mobx-react';
import { Navigate } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface IProp {
  isLoggedIn: boolean;
}
interface IProps {
  store: IProp;
}
interface ITableComponent {
  symbol: string;
  bidPrice: string;
  askPrice: string;
}

const CurrenciesPage = observer((props: IProps) => {
  const [cur, setCur] = useState([]);
  useEffect(() => {
    axios
      .get('https://www.binance.com/api/v3/ticker/24hr')
      .then((response) => {
        setCur(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setCur]);
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
          {cur.map((elem: ITableComponent) => {
            return (
              <tr key={elem.symbol}>
                <td>{elem.symbol}</td>
                <td>{elem.bidPrice}</td>
                <td>{elem.askPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default CurrenciesPage;
