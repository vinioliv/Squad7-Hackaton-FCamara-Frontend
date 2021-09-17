import React from "react"
import {BrowserRouter, Route, Switch  } from "react-router-dom"

import Schedule from "./pages/schedule"

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/schedule" component={Schedule}></Route>
            </Switch>
        </BrowserRouter>
    );
}