import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as merchantActions from '../actions/merchantActions';
import MerchantList from '../components/MerchantList';

import constants from '../constants/SystemConstants';

class MerchantsPage extends React.Component {
    constructor(props) {
        super(props);
        this.deleteMerchant = this.deleteMerchant.bind(this);
    }

    deleteMerchant(id) {
        if (window.confirm(constants.DELETE_MERCHANT_MSG)) {
            this.props.actions.deleteMerchant(id);
        }
    }

    render() {
        return (
            <div className="merchants col-md-12">
                {
                    this.props.loading ?
                        <p className="text-center alert alert-info">{constants.LOADING_MERCHANT}</p>
                        :
                        <MerchantList merchants={this.props.merchants} pages={this.props.pages}
                                      onDeleteMerchant={this.deleteMerchant} currentPage={this.props.currentPage} />
                }
            </div>
        )
    }
}
/**
 * This method is going to generate list of merchants for given page number. Page size is defined in constants
 * @param {*} merchants 
 * @param {*} pageNo 
 */

function generateMerchantsByPage(merchants, pageNo) {
    if (merchants.length) {
        return merchants.filter((merchant, i) => {
            return i >= constants.PAGE_SIZE*(pageNo-1) && i < constants.PAGE_SIZE*pageNo;
        });
    }
    return [];
}

function setPageNumber(state, ownProps){
    let pageNo = ownProps.match.params.pageNo;
    let pageSize = (state.merchants && state.merchants.length) ? state.merchants.length/constants.PAGE_SIZE : 0;
    let currentPageSize = (state.merchants && state.merchants.length) ? state.merchants.length%constants.PAGE_SIZE : 0;

    if(state.merchants.length && pageNo && pageNo > 1 && currentPageSize ===0 && pageNo > pageSize){
        pageNo = pageNo - 1;
        ownProps.history.push('/merchants/'+ pageNo);
    }
 return pageNo || 1;
}

function mapStateToProps(state, ownProps) {
    let pageNo = setPageNumber(state, ownProps);;
    let merchants = generateMerchantsByPage(state.merchants, pageNo);
    return {
        merchants: merchants,
        pages: Math.ceil(state.merchants.length / constants.PAGE_SIZE),
        currentPage: pageNo,
        loading: state.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(merchantActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantsPage);