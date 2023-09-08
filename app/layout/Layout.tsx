import * as React from "react";

import { BoxesList } from "../components";
import { Header } from "./Header";
import "./Layout.css";

export function Layout() {

    return (
        <>
            <Header />
            <BoxesList />
        </>

    )

}