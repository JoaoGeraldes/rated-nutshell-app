import React, { Component } from 'react';
import * as firebase from "firebase";
import '../firebase/fire';
import Rating from "./Rating";
import SearchBar from "./SearchBar";

class Nutshells extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            rateSystem: [],
            user_uid: null,
            currentNutshell_title: '',
            currentNutshell_nutshell: '',
            currentNutshell_date_timestamp: '',
        };

    }

    currentNut(){
        return this.state.currentNutshell_nutshell.__html;
    }

    componentDidMount() {
        const u = firebase.auth().currentUser;
        if (u) {
            this.setState({
                user_uid: u.uid
            });
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState(
                    { user_uid: user.uid }
                )
            }
        });
        const nutshells = firebase.database().ref('nutshells');
        nutshells.on('value', (snapshot) => {
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
                    date_timestamp: items[item].added_timestamp,
                    rating: items[item].rating,
                });
            }
            //console.log(allTitles);
            this.setState({
                items: newState,
            });
        });


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

    render() {
        return (
            <div className="container">
                <SearchBar />
                {console.log(this.state.listDataFromChild)}
                <hr />
                <div className="row">
                    {this.state.items.map((item) => {
                        return (
                            <div className="nutshellContainer">
                                <div id="nutshellModal" className="modal fade" role="dialog">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">{this.state.currentNutshell_title}</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p dangerouslySetInnerHTML={{__html:this.currentNut()}}></p>
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

                                <div key={item.id}>
                                    <div className="col-sm-6 col-md-3">
                                        <div className="thumbnail">
                                            <div className="text-right">
                                            {
                                                this.state.user_uid ?
                                                    <Rating nutshell_id={item.id} useruid={this.state.user_uid} rating={item.rating} />
                                                    :
                                                    null
                                            }
                                            </div>
                                            <img src="https://i.ibb.co/8Mrmz18/nutdocs.png" />
                                            <div className="caption customCaption"  data-toggle="modal" data-target="#nutshellModal" onClick={()=>this.setCurrentNutshell(item.title, item.nutshell, item.author, item.date_timestamp)}>
                                                <h3 className="title">{item.title}</h3>
                                                <p className="desc">{item.description}</p>
                                                {
                                                    item.author_uid === this.state.user_uid ?
                                                        <span className="badge badge-success">{item.author}</span>
                                                        : // else
                                                        <small className="text-secondary">{item.author}</small>
                                                }

                                            </div>
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
export default Nutshells;