import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDates } from '../actions/dates.action';
import { isEmpty } from '../Components/Utils';

const Delivery = () => {

    const [date, setDate] = useState(new Date());
    const [loadDates, setLoadDates] = useState(true);
    const dates = useSelector((state) => state.datesReducer);
    const dispatch = useDispatch();
    console.log(dates);

    useEffect(() => {
        if (loadDates) {
            dispatch(getDates());
            setLoadDates(false);
        }
    }, [loadDates, dispatch]);

    const onFormSubmit = () => {
        localStorage.setItem('deliveryDate', JSON.stringify(date));
        window.location = '/payment';
    };

    const disabledDates = ({date, view}) => {
        if(!isEmpty(dates[0])){
            console.log(new Date(dates.dates[0]).toDateString());
            console.log(date.toDateString());
            const dd = dates.dates.filter(date_ => new Date(date_).toDateString() == date.getTime);
            return view === 'month' && dd.length != 0;
        }
    }

    return ( 
        <div className='home'>
            <FormContainer>
                <CheckoutSteps step1 step2 step5 />
                <h1>Date of delivery</h1>
                <Calendar 
                onChange={setDate} value={date} minDate={new Date()} minDetail='month' 
                tileDisabled={ !isEmpty(dates) ? ({date, view}) => { return (dates.dates.filter(date_ => new Date(date_).toDateString() == date.toDateString()).length != 0)} : () => true}/>
                <span className='bold'>Selected Date:</span>{' '}
                {date.toDateString()}
                <Button
                    className='d-block ml-auto'
                    onClick={onFormSubmit}
                    variant='primary'>
                    Continue
                </Button>
            </FormContainer>
        </div>
    );
};

export default Delivery;