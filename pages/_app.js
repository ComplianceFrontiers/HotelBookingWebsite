import "react-toastify/dist/ReactToastify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/animate.css'
import '../styles/flaticon.css'
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";
import '../styles/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/index";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import '../pages/cart/CartPage.scss'; 
import '../pages/admin/admin2.scss';
import '../pages/tandc/tandc.scss'; 
import '../pages/Gallery/gallery.scss';
import '../pages/dashboard/events1.scss';
import '../pages/overlay/overlay.scss';
import '../pages/login/login.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Bellevue Community Center  - Hotel Booking Next Js Template</title>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </div>

  )
}

export default MyApp
