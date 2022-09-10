import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainRoutes from "src/routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "src/utils/hooks/customReduxHook";
import { RootState } from "src/store/rootReducer";
import { RequestStatus } from "src/types/commonType";
import Loading from "src/components/Loading";

function App() {
  const { requestStatus } = useAppSelector((state: RootState) => state.setting);
  return (
    <BrowserRouter>
      <div className="App">
        {requestStatus === RequestStatus.LOADING && <Loading />}
        <MainRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
