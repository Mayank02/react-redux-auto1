import React from 'react';

import constants from '../constants/SystemConstants';

const BidList = ({bids, goBack}) => {
    return (
        !bids.length ?
            <p className="alert alert-warning text-center">{constants.NO_BID_FOUND}</p>
            :
            <div className="bid-list">
                <div className="responsive-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>{constants.ID}</th>
                            <th>{constants.CAR_TITLE}</th>
                            <th>{constants.AMOUNT}</th>
                            <th>{constants.CREATED}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bids.map(bid =>
                            <tr key={bid.id}>
                                <td>{bid.id}</td>
                                <td>{bid.carTitle}</td>
                                <td>{formatAmount(bid.amount)}</td>
                                <td>{formatDate(bid.created)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
    )
};

function formatAmount(amount) {
    return amount.toLocaleString();
}

function formatDate(date) {
    return new Date(date).toString();
}

export default BidList;