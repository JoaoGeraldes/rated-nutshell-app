import React, { Component } from 'react';
import * as firebase from "firebase";
import '../firebase/fire';

class EditarPerfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_uid: null,
            displayName: null,
            photoURL: null,

        };

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
                {
                        user_uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    }
                )
            }
        });
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <img height="128px" width="128px" className="img-thumbnail" src={this.state.photoURL} />
                    <p>{this.state.displayName}</p>
                </div>
            </div>
        );
    }
}
export default EditarPerfil;