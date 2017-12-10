import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as merchantActions from '../actions/merchantActions';
import MerchantForm from '../components/MerchantForm';
import constants from '../constants/SystemConstants';

class AddMerchantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formStatus: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.props.merchantForm.syncErrors) {
            let merchant = Object.assign({}, this.props.merchantForm.values, {
                id: this.props.newId,
                bids: []
            });
            this.props.actions.addMerchant(merchant);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            <div className="add-merchant col-md-12">
                <h1 className="text-center text-capitalize">{constants.NEW_MERCHANT}</h1>
                <MerchantForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus} />
            </div>
        )
    }
}

/**
 * This method will generate new id for newly added merchent
 * @param {*} merchants 
 */
function generateNewId(merchants) {
    let sortedMerchants = merchants.slice(0);
    sortedMerchants = sortedMerchants.sort(function(a, b) {
        return b.id - a.id;
    });
    let lastId = sortedMerchants.length ? parseInt(sortedMerchants[0].id, 10) : 0;
    return lastId + 1;
}

function mapStateToProps(state) {
    let newId = generateNewId(state.merchants);
    return {
        merchantForm: state.form.merchant,
        newId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(merchantActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantPage);