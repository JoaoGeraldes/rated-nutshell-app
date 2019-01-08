import React, { Component } from 'react';
import * as firebase from "firebase";
import '../firebase/fire';
import {Link} from "react-router-dom";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            user_uid: null,
            currentNutshell_title: '',
            currentNutshell_nutshell: '',
            currentNutshell_date_timestamp: ''
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState(
                    { user_uid: user.uid }
                )
                this.firebaseQuery();
            }
        });


    }

    firebaseQuery(){
        // Referência para a base de dados
        const nutshells = firebase.database().ref('nutshells');
        // Query e construção de objeto de itens
        nutshells.orderByChild("author_uid").equalTo(this.state.user_uid).on('value', (snapshot) => {

            let items = snapshot.val();
            let newState = [];

            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    description: items[item].description,
                    nutshell: items[item].nutshell,
                    author: items[item].author,
                    author_uid: items[item].author_uid,
                    date_timestamp: items[item].added_timestamp
                });
            }

            this.setState({
                items: newState
            });
        });
    }

    apagarNutshell(nutshell) {
        const nut = firebase.database().ref(`/nutshells/${nutshell}`);
        nut.remove();
    }

    setCurrentNutshell(title, nutshell, author, date_timestamp){
        this.setState(
            {
                currentNutshell_title: title,
                currentNutshell_nutshell: nutshell,
                currentNutshell_author: author,
                currentNutshell_date_timestamp: date_timestamp,
            }
        )

        //console.log(this.state.items[date_timestamp]);
    }

    currentNut(){
        return this.state.currentNutshell_nutshell.__html;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row"><div className="well well-sm">Tenho <span className="label label-default">{this.state.items.length}</span> nutshell.</div></div>
                <div className="row">
                    { this.state.items.length < 1 ?
                        <div className="text-center">
                            <img className="img-responsive center-block" style={{maxHeight: '300px'}} src="https://i.imgur.com/EVYOkXu.jpg" title="Sem nutshells" />
                            <div className="well well-sm" style={{maxWidth: '400px', margin:'0 auto'}}>
                                <h4>Não tenho nenhum nutshell <span className="fa fa-frown-o"></span></h4>
                                <Link to="/criar-nutshell/"><a className="btn btn-primary">Criar um nutshell</a></Link>
                            </div>
                        </div>
                        :
                        null
                    }
                    {this.state.items.map((item) => {
                        return (
                            <div className="nutshellContainer">
                                <div id="nutshellModal" className="modal fade" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">{this.state.currentNutshell_title}</h4>
                                            </div>
                                            <div className="modal-body">
                                                <div className="nutshellCustom" dangerouslySetInnerHTML={{__html: this.currentNut()}}></div>
                                                <p><h6>{this.state.currentNutshell_author}</h6></p>
                                                <small>{this.state.currentNutshell_date_timestamp}</small>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Fechar
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div>

                                    <div className="col-sm-6 col-md-3">
                                        <div className="thumbnail">
                                            <img src="https://i.ibb.co/8Mrmz18/nutdocs.png" />
                                            <div className="caption customCaption" key={item.id} data-toggle="modal" data-target="#nutshellModal" onClick={()=>this.setCurrentNutshell(item.title, item.nutshell, item.author, item.date_timestamp)}>
                                                <h3>{item.title}</h3>
                                                <p>{item.description}</p>
                                                <small className="text-secondary">{item.author}</small>
                                            </div>
                                                <p>
                                                    {
                                                        item.author_uid === this.state.user_uid ?
                                                            <div className="text-right"><button onClick={()=>this.apagarNutshell(item.id)} type="button" className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-trash"></span></button></div>
                                                            :
                                                            null
                                                    }
                                                </p>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
export default Dashboard;