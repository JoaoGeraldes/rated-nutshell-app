import React, {Component} from 'react';
import * as firebase from "firebase/app";
import '../firebase/fire';
import {autoComplete} from "./auto-complete";
import './auto-complete.css';



class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: null
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);

    }

    getCurrentText(tags){
        new autoComplete({
            selector: 'input[name="q"]',
            minChars: 2,
            source: function(term, suggest){
                term = term.toLowerCase();
                let choices = tags;
                let matches = [];
                for (let i=0; i<choices.length; i++)
                    if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
                suggest(matches);
            }
        });
    }

    componentDidMount() {

        const nutshells = firebase.database().ref('nutshells');
        nutshells.on('value', (snapshot) => {
            let items = snapshot.val();
            let allTitles = [];
            for (let item in items) {

                // Substitui os espaços por vírgulas (do título)
                //let i = items[item].title.split(" ");

                // Junta todos (os títulos) num objeto
                allTitles.push(items[item].title);
            }
            console.log(allTitles);
            this.setState({
                tags: allTitles,
            });
            console.log(allTitles);
            this.getCurrentText(allTitles);
        });

    }

    onSubmitHandler(){
        const text = document.getElementById("qtext").value;
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{maxWidth: '600px', margin: '0 auto'}}>
                    <div className="col-lg-6" style={{width: '100%', margin: '0 auto'}}>
                        <div className="input-group">
                            <input id="qtext" onChange={this.onChangeHandler} name="q" type="text" className="form-control" placeholder="Procurar por títulos..." />
                            <span className="input-group-btn">
                            <button onClick={this.onSubmitHandler} className="btn btn-default" type="button"><span className="glyphicon glyphicon-search
"></span></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;