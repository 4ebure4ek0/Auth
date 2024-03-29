import { observer } from 'mobx-react';
import { Navigate } from 'react-router';
import { useEffect } from 'react';
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Error from '../components/Error';

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
const CurrenciesPage:React.FC<IProps> = observer((props) => {
  useEffect(() => {
    props.currencies.fetchCurrencies();
  }, []);
  if (props.currencies.loading) {
    return (
      <Box sx={{
        height: 700,
        display: 'flex',
        alignItems: 'center'
      }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <TableContainer component={Paper} sx={{
        marginTop: 10
      }}>
        {props.store.isLoggedIn ? null : <Navigate to="/" />}
        {props.currencies.errorMessage.length? null : <Error error = {props.currencies.errorMessage} />}
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Symbol</h3>
              </TableCell>
              <TableCell>
                <h3>Bid Price</h3>
              </TableCell>
              <TableCell>
                <h3>Ask Price</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.currencies.pairs.map((pair: any) => {
              return (
                <TableRow key={pair.symbol}>
                  <TableCell>{pair.symbol}</TableCell>
                  <TableCell>{pair.bidPrice}</TableCell>
                  <TableCell>{pair.askPrice}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
});

export default CurrenciesPage;



