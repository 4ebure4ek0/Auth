import { observer } from 'mobx-react';
import { useState } from 'react';
import { Navigate } from 'react-router';

interface IPropStore {
    isLoggedIn: boolean;
}
interface IPropCurrencies{
    loading: boolean;
    pairs: Array<string>;
    errorMessage: string;
    fetchCurrencies: () => void
}
interface IProps {
    store: IPropStore;
    currencies: IPropCurrencies;
}
interface ITableComponent {
    symbol: string;
    bidPrice: string;
    askPrice: string;
}

const CurrenciesPage = observer((props: IProps) => {
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
                    {/* {props.currencies.pairs.map((elem: ITableComponent) => {
                        return (
                            <tr key={elem.symbol}>
                                <td>{elem.symbol}</td>
                                <td>{elem.bidPrice}</td>
                                <td>{elem.askPrice}</td>
                            </tr>
                        );
                    })} */}
                </tbody>
            </table>
        </div>
    );
});

export default CurrenciesPage;
