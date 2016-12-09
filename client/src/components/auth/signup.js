import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

    handleFormSubmit(formProps){
        this.props.signupUser(formProps);
    }

    renderAlert(){
        let error = null;

        if(this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Ooops! </strong>
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {

        const {handleSubmit, fields: {email, password, repassword}} = this.props;

        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <input {...email} className="form-control"/>
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>

                <fieldset className="form-group">
                    <label>Password</label>
                    <input type="password" {...password} className="form-control"/>
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>

                <fieldset className="form-group">
                    <label>Confirm password</label>
                    <input type="password" {...repassword} className="form-control"/>
                    {repassword.touched && repassword.error && <div className="error">{repassword.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sing up</button>
            </form>
        );
    }
}

function validate(formProps){
    const errors = {};

    if(!formProps.email){
        errors.email = 'Please enter an email';
    }
    if(!formProps.password){
        errors.password= 'Please enter a password';
    }
    if(!formProps.repassword){
        errors.repassword= 'Please enter a password confirmation';
    }

    if(formProps.password !== formProps.repassword){
        errors.password = 'Passwords must match'
    }
    
    return errors;
}

function mapStateToProps(state){
    return {errorMessage:state.auth.error};
}

export default reduxForm({
    form: 'signup',
    fields: [ 'email', 'password', 'repassword'],
    validate,

}, mapStateToProps, actions)(Signup);