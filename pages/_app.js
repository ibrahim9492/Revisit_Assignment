import { Provider } from 'react-redux';
import store from '@/context/Store';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default function App(props) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  );
}