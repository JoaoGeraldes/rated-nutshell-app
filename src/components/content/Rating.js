import React, { Component } from 'react';
import * as firebase from "firebase";
import '../firebase/fire';
import './styles.css';

class Rating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            u_uid: props.useruid,
            nutshell_id: props.nutshell_id,
            rating: props.rating,
            nutshellVerified: null,
            retrievedNutshellKeyID: null,
        };

        this.handleSetRate = this.handleSetRate.bind(this);
        this.handleRemoveRate = this.handleRemoveRate.bind(this);

    }

    getActualRatingValue(){
        const nutshells = firebase.database().ref('nutshells/'+this.state.nutshell_id);
        nutshells.on('value', (snapshot) => {
            this.setState({rating: snapshot.val().rating})
        });
    }

    componentDidMount(nutshell_id = this.state.nutshell_id, user_uid = this.state.u_uid) {

        this.getActualRatingValue();

        const rating = firebase.database().ref('rating');
        rating.orderByChild('user_uid').equalTo(user_uid).on("value", (snapshot) => {
            let retrievedNutshellID = false;
            let retrievedNutshellKeyID = null;
            snapshot.forEach(function(data) {
                if (nutshell_id === data.val().nutshell_id){
                    retrievedNutshellID = true;
                    // ID da database
                    retrievedNutshellKeyID = data.key;
                }
            });
            if (retrievedNutshellID === true){
                this.setState({
                    nutshellVerified: true,
                    retrievedNutshellKeyID: retrievedNutshellKeyID,
                });
            }
        });
    }


    handleSetRate() {
        let stateRating = this.state.rating+1;


        const rate = {
            user_uid: this.state.u_uid,
            nutshell_id: this.state.nutshell_id,
        };
        const rating = firebase.database().ref('rating');

        // Objeto a ser gravado na Firebase
        rating.push(rate);

        const f = firebase.database().ref();
        f.child('/nutshells/' + this.state.nutshell_id).update({
            rating: stateRating,
        });

        this.setState({rating: stateRating});
    }


    handleRemoveRate() {
        let stateRating = this.state.rating-1;

        const r = firebase.database().ref(`/rating/${this.state.retrievedNutshellKeyID}`);
        r.remove();
        this.setState({
            nutshellVerified: false
        })


        const f = firebase.database().ref().child('/nutshells/' + this.state.nutshell_id).update({
            rating: stateRating,
        });

        this.setState({rating: stateRating});
    }
    render() {
        return(
            <div>
                <p>
                    {
                        this.state.nutshellVerified === true ?
                            <button className="btn btn-danger" onClick={()=>{this.handleRemoveRate()}}><span className='glyphicon glyphicon-heart-empty'/> {this.props.rating}</button>
                        :
                            <button className="btn btn-default" onClick={()=>{this.handleSetRate()}}><span className="glyphicon glyphicon-heart-empty"/> {this.props.rating}</button>
                    }

                </p>
            </div>
        )
    }

}
export default Rating;