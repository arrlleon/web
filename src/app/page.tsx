"use client"
import DishList from "@/components/DishList/DishList";
import store from "../store/store";
import { Provider } from "react-redux";


export default function Home() {
  return<Provider store={store}>
            <DishList/>
        </Provider>
}
