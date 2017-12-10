import React from 'react';
import {NavLink} from 'react-router-dom';

import constants from '../constants/SystemConstants';
import Pagination from './Pagination';

const MerchantList = ({merchants, onDeleteMerchant, pages, currentPage}) => {
    return (
        !merchants.length ?
            <p className="alert alert-warning text-center">{constants.NO_MERCHANT_FOUND}</p>
            :
            <div className="merchant-list">
                <div className="responsive-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>{constants.ID}</th>
                            <th>{constants.FIRST_NAME}</th>
                            <th>{constants.LAST_NAME}</th>
                            <th>{constants.AVATAR}</th>
                            <th>{constants.EMAIL}</th>
                            <th>{constants.PHONE_NUMBER}</th>
                            <th>{constants.PREMIUM}</th>
                            <th>{constants.BIDS}</th>
                            <th>{constants.EDIT}</th>
                            <th>{constants.DELETE}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {merchants.map(merchant =>
                            <tr key={merchant.id}>
                                <td>{merchant.id}</td>
                                <td>{merchant.firstname}</td>
                                <td>{merchant.lastname}</td>
                                <td><img className="avatar" src={merchant.avatarUrl} alt="Merchant Avatar"/></td>
                                <td>{merchant.email}</td>
                                <td>{merchant.phone}</td>
                                <td className="premium">
                                    {
                                        merchant.hasPremium ?
                                            <span className="glyphicon glyphicon-ok"></span>
                                            :
                                            <span className="glyphicon glyphicon-remove"></span>
                                    }
                                </td>
                                <td>
                                    <NavLink to={'/bids/' + merchant.id}>{constants.VIEW_BIDS}</NavLink>
                                </td>
                                <td>
                                    <NavLink className="btn btn-primary btn-sm"
                                             to={'/edit/' + merchant.id}>{constants.EDIT}</NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                            onClick={() => onDeleteMerchant(merchant.id)}>{constants.DELETE}
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                { 
                    pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>
                }
            </div>
    )
};

export default MerchantList;