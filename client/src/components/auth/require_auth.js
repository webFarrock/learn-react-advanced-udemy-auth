import React, {Component} from 'react';
import { connect } from 'react-redux';


export default function(ComposedComponent){
    class Auth extends Component{

        static contextTypes = {
            router: React.PropTypes.object,
        }

        componentWillMount(){
            if(!this.props.authed){
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.authed){
                this.context.router.push('/');
            }
        }

        render(){
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state){
        return {authed: state.auth.authed}
    }

    return connect(mapStateToProps)(Auth);
}