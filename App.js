import { NavigationContainer } from "@react-navigation/native";
import { Auth } from "authentication";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./src/store/rootReducer";

const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Auth />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
