import React, {Component} from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import MainContent from '../content/MainContent';
import {auth, provider, provider_fb} from "../firebase/fire";
import 'bootstrap-social';
import 'font-awesome/css/font-awesome.min.css';
import SearchBar from "../content/SearchBar";


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            photoURL: null,
            displayName: null
        }

        // Bindings
        this.login = this.login.bind(this);
        this.login_fb = this.login_fb.bind(this);
        this.logout = this.logout.bind(this);
    }


    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                });

            });

    }
    login_fb() {
        auth.signInWithPopup(provider_fb)
            .then((result) => {
                const user = result.user;
                this.setState({
                    photoURL: user.photoURL,
                    displayName: user.displayName
                });

            });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    displayName: null
                });
            });

        //Reload da página
        window.location.reload();
    }

    // Verificar se o utilizador tem sessão iniciada depois do refresh page
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user.displayName) {
                this.setState({
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            }
        });
    }


    render() {
        // Elementos de link HTML
        const logo = <a className="navbar-brand d-inline-block align-top"><img src="https://i.imgur.com/8nPsxW5.png" width="22px" height="22px" /></a>
        const nutshell = <a className="navbar-brand" href="#">Nutshell</a>;
        const sobre = <a className="navbar-brand"><span style={{color: '#337ab7'}} className="glyphicon glyphicon-question-sign"></span></a>;
        const criarConta = <button className="btn btn-secondary" disabled>Criar conta</button>;
        const google = <button data-dismiss="modal" className="btn-block btn-social btn-google btn-lg" onClick={this.login}><span className="fa fa-google"></span> Entrar com google</button>;
        const fb = <button data-dismiss="modal" className="btn-block btn-social btn-facebook btn-lg" onClick={this.login_fb}><span className="fa fa-facebook-official"></span> Entrar com facebook</button>;
        const criarNutshell = <a>Criar nutshell</a>;
        const editarPerfil = <a>Editar perfil</a>;
        const dashboard = <a>Dashboard</a>;
        const logout = <a>Terminar sessão</a>
        return (
            <Router>
                <div>
                    <div id="loginModal" className="modal fade" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Iniciar sessão</h4>
                                </div>
                                <div className="modal-body">
                                    <p>{google}</p>
                                    <hr placeholder="ou" />
                                    <p>{fb}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Fechar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <div className="navbar-nav">
                                    <Link to="/">{logo}</Link>
                                    <Link to="/">{nutshell}</Link>
                                    <Link to="/sobre/">{sobre}</Link>
                                </div>
                            </div>
                        { this.state.displayName ?
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right">

                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                    aria-haspopup="true" aria-expanded="false">{this.state.user}
                                        <img height="42px" width="42px" className="img-thumbnail" src={this.state.photoURL} /><span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/criar-nutshell/">{criarNutshell}</Link></li>
                                        <li><Link to="/editar-perfil/">{editarPerfil}</Link></li>
                                        <li><Link to="/dashboard/">{dashboard}</Link></li>
                                        <li role="separator" className="divider"></li>
                                        <li onClick={()=>{this.logout()}}><Link to="/">{logout}</Link></li>
                                    </ul>
                                </li>
                                </ul>
                            </div>
                            : ///////////// else /////////////
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/criar-conta/">{criarConta}</Link></li>
                                    <li><Link to="/"><button className="btn btn-primary" type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">Login</button></Link></li>
                                </ul>
                            </div>
                        }
                        </div>
                    </nav>
                    <MainContent />
                </div>
            </Router>
        );
    }
}

export default Navbar;