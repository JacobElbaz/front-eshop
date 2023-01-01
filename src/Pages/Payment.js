import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import Input from '../Components/Input';
import { paymentFormValidationSchema } from '../validations';

const initialValues = {
    creditCard: '',
    ID: '',
    expiredDate: '',
    CVV: '',
};

const Payment = () => {
    
    const shippingAddress = localStorage.getItem("shippingAddress");

    if (!shippingAddress) {
        window.location = "/shipping";
    }

    const onFormSubmit = (paymentMethod) => {
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
        window.location = '/placeorder';
    };

    return (
        <>

            <FormContainer>
                <CheckoutSteps step1 step2 step3 step5 />
                <h1>Payment method</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={paymentFormValidationSchema}
                    onSubmit={onFormSubmit}
                    enableReinitialize>
                    {() => (
                        <Form>
                            <Input label='Credit Card Number' name='creditCard' type='text' />
                            <Input label='ID' name='ID' type='text' />
                            <Input label='Expired Date' name='expiredDate' type='text' />
                            <Input label='CVV' name='CVV' type='text' />
                            <Button
                                className='d-block ml-auto'
                                type='submit'
                                variant='primary'>
                                Continue
                            </Button>
                        </Form>
                    )}
                </Formik>
            </FormContainer>
        </>
    );
};

export default Payment;