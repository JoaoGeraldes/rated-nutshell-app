import React, { Component } from 'react';
import * as firebase from "firebase";
import '../firebase/fire';

class CriarConta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(this.state);
    }

    handleSubmit(event){
        event.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        itemsRef.push(item);

        this.setState({
            username: '',
            email: '',
            password: ''
            }

        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Nome artístico</label>
                            <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" placeholder="Nome próprio ou pseudónimo" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input onChange={this.handleChange} value={this.state.email} type="email" className="form-control" id="email" placeholder="E-mail válido" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Criar</button>
                </form>
            </div>
        );
    }
}
export default CriarConta;