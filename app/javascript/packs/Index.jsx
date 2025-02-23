// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "../components/App";
import allReducers from "../reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppContextProvider } from "../contexts/AppContext";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.classList.add("vh-100");

  render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DndProvider>
    </Provider>,
    document.body.appendChild(container)
  );
});
