import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { addDate, getDates } from '../actions/dates.action';
import { isEmpty } from '../Components/Utils';

const DeliveryDates = () => {

    const [date, setDate] = useState(new Date());
    const [loadDates, setLoadDates] = useState(true);
    const dispatch = useDispatch();
    const dates = useSelector((state) => state.datesReducer);

    const onFormSubmit = () => {
        dispatch(addDate(date));
        setLoadDates(true);
    };

    useEffect(() => {
        if (loadDates) {
            dispatch(getDates());
            setLoadDates(false);
        }
    }, [loadDates, dispatch]);

    return (
        <div className='home'>
            <FormContainer>
                <h1>Date of NO-delivery</h1>
                <Calendar onChange={setDate} value={date} minDate={new Date()} minDetail='year' />
                <span className='bold'>Selected Date:</span>{' '}
                {date.toDateString()}
                <Button
                    className='d-block ml-auto'
                    onClick={onFormSubmit}
                    variant='primary'>
                    Don't delivery at this date
                </Button>
            </FormContainer>
            <hr />
            <div>
                { !isEmpty(dates) &&
                    dates.dates.map((date) => {
                        return (
                            <li key={date}>{new Date(date).toDateString()}</li>
                        )
                    })}
            </div>
        </div>
    );
};

export default DeliveryDates;