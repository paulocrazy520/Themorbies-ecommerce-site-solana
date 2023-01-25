
import App from './App';
import { Wallets } from './components/wallet'
import { SnackbarProvider } from 'notistack';


function Main() {

  // I will try to start with new project
  // this project is so stressful
  return (
    <SnackbarProvider>
      <Wallets>
        <App />
      </Wallets>
    </SnackbarProvider>
  );
}

export default Main;
