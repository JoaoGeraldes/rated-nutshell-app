import React, { Component } from 'react';
import * as firebase from "firebase";
import Trumbowyg from 'react-trumbowyg';
import 'react-trumbowyg/dist/trumbowyg.min.css';



class CriarNutshell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            nutshell: '',
            author: 'anonymous',
            author_uid: '',
            added_timestamp: '',
            rating: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTrumbowigChange = this.handleTrumbowigChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleTrumbowigChange(event) {
        const htmlText = { __html: event.target.innerHTML };
        this.setState({
                nutshell: htmlText
            }
        )
    }

    handleSubmit(event){
        event.preventDefault();
        const nutshells = firebase.database().ref('nutshells');
        const now = new Date().toLocaleString();
        const nutshell = {
            title: this.state.title,
            description: this.state.description,
            nutshell: this.state.nutshell,
            author: this.state.author,
            author_uid: this.state.author_uid,
            added_timestamp: now,
            rating: this.state.rating
        };

        // Objeto a ser gravado na Firebase
        nutshells.push(nutshell);

        this.setState({
                title: '',
                description: '',
                nutshell: '',
                author: '',
                author_uid: '',
            }
        )

        window.location.assign("/dashboard")
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user.displayName) {
                this.setState({
                    author: user.displayName,
                    author_uid: user.uid,
                });
            }
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="well small" style={{maxWidth: '80%', margin:'0 auto'}}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input required onChange={this.handleChange} value={this.state.title} type="text" className="form-control" id="title" placeholder="Título" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <input required onChange={this.handleChange} value={this.state.description} type="text" className="form-control" id="description" placeholder="Descrição" />
                        </div>

                        <Trumbowyg

                            placeholder='Escreve um texto de forma sucinta'
                            onChange={ this.handleTrumbowigChange }
                            name="nutshell"
                            id='react-trumbowyg'
                            required
                        />
                        <button type="submit" className="btn btn-primary">Criar</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default CriarNutshell;