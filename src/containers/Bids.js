import React from 'react';
import { connect } from 'react-redux';

import BidList from '../components/BidList';
import constants from '../constants/SystemConstants';

const BidsPage = ({loading, bids, goBack}) => {
    return (
        <div className="bids col-md-12">
            {
                loading ?
                    <p className="text-center alert alert-info">{constants.LOADING_BIDS}</p>
                    :
                    <div>
                        <button onClick={goBack} className="btn btn-info">
                            <span className="glyphicon glyphicon-arrow-left"></span> {constants.RETURN_TO_LIST}
                        </button>
                        <BidList bids={bids} />
                    </div>
            }
        </div>
    )
};

/**
 * This method will return the bids foe the selected merchent
 * @param {*} merchants 
 * @param {*} id 
 */
function generateBids(merchants, id = -1) {
    let merchant = merchants.find(merchant => {
        return parseInt(merchant.id, 10) === parseInt(id, 10);
    });
    if (merchant) {
        return merchant.bids.sort(function(a, b) {
            return new Date(b.created) - new Date(a.created);
        });
    } else {
        return [];
    }
}

function mapStateToProps(state, ownProps) {
    let bids = state.merchants.length ? generateBids(state.merchants, ownProps.match.params.id) : [];
    return {
        bids,
        loading: state.loading,
        goBack: ownProps.history.goBack
    }
}

export default connect(mapStateToProps)(BidsPage);