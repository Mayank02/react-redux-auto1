import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {NavLink} from 'react-router-dom';

import constants from '../constants/SystemConstants';

let MerchantForm = ({onSubmit, submitting, formStatus}) => {
    return (
        <div className="row">
            <div className="col-sm-6 col-lg-4 col-sm-push-3 col-lg-push-4">
                <form onSubmit={ onSubmit } noValidate>
                    <Field name="firstname" component={renderField} type="text"
                           id="first-name" label="First Name"/>
                    <Field name="lastname" component={renderField} type="text"
                           id="last-name" label="Last Name"/>
                    <Field name="avatarUrl" component={renderField} type="url"
                           id="avatar-url" label="Avatar Url"/>
                    <Field name="email" component={renderField} type="email"
                           id="email-address" label="Email Address"/>
                    <Field name="phone" component={renderField} type="tel"
                           id="phone-number" label="Phone Number"/>
                    <Field name="has-premium" component={renderField} type="checkbox"
                        label="Has Premium"
                    />
                    <button type="submit" className="btn btn-primary merchant-submit" disabled={submitting}>{constants.SUBMIT}</button>
                </form>
                {formStatus === 'success' &&
                <p className="alert alert-success">
                    {constants.MERCHANT_SAVED}
                    <NavLink to="/merchants/1"> {constants.RETURN_TO_LIST}</NavLink>
                </p>}
                {formStatus === 'error' &&
                <p className="alert alert-danger">{constants.MERCHANT_SAVING_FAILED}</p>}
            </div>
        </div>
    )
};

const renderField = ({
    input,
    label,
    type,
    id,
    meta: {touched, error}
}) => (
    (type === 'checkbox')
        ?
        <div className="checkbox">
            <label>
                <input {...input} type={type}/>
                {label}
            </label>
            {touched &&
            (error &&
            <span className="error-text">
            {error}
          </span>)}
        </div>
        :
        <div className="form-group">
            <label htmlFor={id}>
                {label}
            </label>
            <input {...input} id={id} type={type} className="form-control"/>
            {touched &&
            (error &&
            <span className="error-text">
            {error}
          </span>)}
        </div>
);

function validate(formProps) {
    const errors = {};

    if (!formProps.firstname) {
        errors.firstname = constants.FIRST_NAME_TITLE;
    }

    if (!formProps.lastname) {
        errors.lastname = constants.LAST_NAME_TITLE;
    }

    if (!formProps.avatarUrl) {
        errors.avatarUrl = constants.AVATAR_URL_TITLE;
    }

    if (!formProps.email) {
        errors.email = constants.EMAIL_TITLE;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = constants.INVALID_EMAIL_MSG;
    }

    if (!formProps.phone) {
        errors.phone = constants.PHONE_TITLE;
    }

    return errors;
}

MerchantForm = reduxForm({
    form: 'merchant',
    validate,
    enableReinitialize: true
})(MerchantForm);

export default MerchantForm;