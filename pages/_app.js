
import '../styles/globals.css'
import  {Store } from "../store/TemporaryList"
import { Provider } from "react-redux"

function MyApp({ Component, pageProps }) {
  return<Provider store={Store}>
      <Component {...pageProps} />
  </Provider>
}

export default MyApp
