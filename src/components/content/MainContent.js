import React, {Component} from 'react';
import { Route } from "react-router-dom";

import Nutshells from "./Nutshells";
import Sobre from "./Sobre";
import CriarNutshell from "../menu/CriarNutshell";
import EditarPerfil from "../menu/EditarPerfil";
import Dashboard from "../menu/Dashboard";
import CriarConta from "../menu/CriarConta";

class MainContent extends Component {
    render() {
        return (
            <div className="container-fluid">
                <small style={{color: '#9b9b9b'}}><span className="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;{window.location.pathname.replace(/[\\\/][^\\\/]*$/, '')}</small>
                <hr />
                <Route exact path="/" component={Nutshells} />
                <Route path="/sobre/" component={Sobre} />
                <Route path="/criar-nutshell/" component={CriarNutshell} />
                <Route path="/editar-perfil/" component={EditarPerfil} />
                <Route path="/dashboard/" component={Dashboard} />
                <Route path="/criar-conta/" component={CriarConta} />
            </div>
        );
    }
}

export default MainContent;