import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux/es/exports";
import { store } from "./redux/store";
import './Translation/i18n'
// axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.headers.common["Authorization"] = "Auth Token";
// axios.interceptors.request.use((request: any) => {
//   console.log(request);
//   // request.headers.channelName = "dharti web dev";
//   return request;
// });

// axios.interceptors.response.use((response: any) => {
//   console.log(response);
//   return response;
// });

// store.dispatch(fetchProducts());
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
