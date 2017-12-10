import React from 'react';
import {NavLink} from 'react-router-dom';

import constants from '../constants/SystemConstants';

const Pagination = ({currentPage, pages}) => {
    let prevLink = parseInt(currentPage, 10) - 1;
    let nextLink = parseInt(currentPage, 10) + 1;
    return (
        <div className="text-center">
            <nav>
                <ul className="pager">
                    <li>
                        {prevLink > 0 ? 
                            <NavLink to={'/merchants/' + prevLink}>{constants.PREVIOUS}</NavLink>
                            :
                            <span>{constants.PREVIOUS}</span>
                        }
                    </li>
                    <li>
                        {nextLink <= pages ? 
                            <NavLink to={'/merchants/' + nextLink}>{constants.NEXT}</NavLink>
                            :
                            <span>{constants.NEXT}</span>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Pagination;