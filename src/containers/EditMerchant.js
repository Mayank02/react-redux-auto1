import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as merchantActions from '../actions/merchantActions';
import MerchantForm from '../components/MerchantForm';
import constants from '../constants/SystemConstants';

class EditMerchantPage extends React.Component {
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
                id: this.props.currentMerchant.id,
                bids: this.props.currentMerchant.bids
            });
            this.props.actions.editMerchant(merchant);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            this.props.loading ?
                <p className="text-center alert alert-info">{constants.LOADING_MERCHANT}</p>
                :
                !this.props.currentMerchant ?
                    <p className="text-center alert alert-danger">{constants.MERCHANT_NOT_FOUND}</p>
                    :
                    <div className="add-merchant">
                        <h1 className="text-center text-capitalize">{constants.EDIT_MERCHANT_INFO}</h1>
                        <MerchantForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus}
                                      initialValues={this.props.currentMerchant} goBack={this.props.goBack} />
                    </div>
        )
    }
}

/**
 * This method will return the selected merchent based on the passed id
 * @param {*} merchants 
 * @param {*} id 
 */
function findCurrentMerchant(merchants, id = -1) {
    return merchants.find(merchant => {
        return parseInt(merchant.id, 10) === parseInt(id, 10);
    });
}

function mapStateToProps(state, ownProps) {
    let currentMerchant = state.merchants.length ? findCurrentMerchant(state.merchants, ownProps.match.params.id) : null;
    return {
        currentMerchant,
        merchantForm: state.form.merchant,
        loading: state.loading,
        goBack: ownProps.history.goBack
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(merchantActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMerchantPage);