import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { addressFormValidationSchema } from '../validations';
import FormContainer from '../Components/FormContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import Input from '../Components/Input';

const initialValues = {
    address: '',
    city: '',
    postalCode: '',
    street: '',
};

const Shipping = () => {

    const cities = [
        
        { title: 'Afula', value: 'Afula' },
        { title: 'Akko', value: 'Akko' },
        { title: 'Arad', value: 'Arad' },
        { title: 'Ariel', value: 'Arad' },
        { title: 'Ashdod', value: 'Ashdod' },
        { title: 'Ashkelon', value: 'Ashkelon' },
        { title: 'Baqa al-Gharbiyye', value: 'Baqa al-Gharbiyye' },
        { title: 'Bat Yam', value: 'Bat Yam' },
        { title: 'Beer Sheva', value: 'Beer Sheva' },
        { title: 'Beit Shean', value: 'Beit Shean' },
        { title: 'Beit Shemesh', value: 'Beit Shemesh' },
        { title: 'Betar Illit', value: 'Betar Illit' },
        { title: 'Bnei Berak', value: 'Bnei Berak' },
        { title: 'Dimona', value: 'Dimona' },
        { title: 'Eilat', value: '	Eilat' },
        { title: 'Elad', value: 'Elad' },
        { title: 'Givatayim', value: 'Givatayim' },
        { title: 'Hadera', value: 'Hadera' },
        { title: 'Haifa', value: 'Haifa' },
        { title: 'Harish', value: 'Harish' },
        { title: 'Herzliya', value: 'Herzliya' },
        { title: 'Hod HaSharon', value: 'Hod HaSharon' },
        { title: 'Holon', value: 'Holon' },
        { title: 'Jerusalem', value: 'Jerusalem' },
        { title: 'Karmiel', value: 'Karmiel' },
        { title: 'Kfar Sava', value: 'Kfar Sava' },
        { title: 'Kiryat Ata', value: 'Kiryat Ata' },
        { title: 'Kiryat Bialik', value: 'Kiryat Bialik' },
        { title: 'Kiryat Gat', value: 'Kiryat Gat' },
        { title: 'Kiryat Malachi', value: 'Kiryat Malachi' },
        { title: 'Kiryat Motzkin', value: 'Kiryat Motzkin' },
        { title: 'Kiryat Ono', value: 'Kiryat Ono' },
        { title: 'Kiryat Yam', value: 'Kiryat Yam' },
        { title: 'Lod', value: 'Lod' },
        { title: 'Maale Adumim', value: 'Maale Adumim' },
        { title: 'Maalot Tarshiha', value: 'Maalot Tarshiha' },
        { title: 'Migdal HaEmek', value: 'Migdal HaEmek' },
        { title: 'Modiin', value: 'Modiin' },
        { title: 'Nahariya', value: 'Nahariya' },
        { title: 'Nazareth', value: 'Nazareth' },
        { title: 'Nes Ziona', value: 'Nes Ziona' },
        { title: 'Nesher', value: 'Nesher' },
        { title: 'Netanya', value: 'Netanya' },
        { title: 'Netivot', value: 'Netivot' },
        { title: 'Nof Hagalil', value: 'Nof Hagalil' },
        { title: 'Ofakim', value: 'Ofakim' },
        { title: 'Or Akiva', value: 'Or Akiva' },
        { title: 'Or Yehuda', value: 'Or Yehuda' },
        { title: 'Petah Tikva', value: 'Petah Tikva' },
        { title: 'Raanana', value: 'Raanana' },
        { title: 'Ramat Hasharon', value: 'Ramat Hasharon' },
        { title: 'Ramat-Gan', value: 'Ramat-Gan' },
        { title: 'Ramla', value: 'Ramla' },
        { title: 'Rehovot', value: 'Rehovot' },
        { title: 'Rishon Lezion', value: 'Rishon Lezion' },
        { title: 'Rosh Haayin', value: 'Rosh Haayin' },
        { title: 'Sderot', value: 'Sderot' },
        { title: 'Tel Aviv', value: 'Tel Aviv' },
        { title: 'Tiberias', value: 'Tiberias' },
        { title: 'Yavne', value: 'Yavne' },
        { title: 'Yehud-Monosson', value: 'Yehud-Monosson' },
        { title: 'Yokneam', value: 'Yokneam' },
      ];

    let [address, setAddress] = useState()
    let localAddress = localStorage.getItem("shippingAddress");


    useEffect(() => {
        localAddress = JSON.parse(localAddress);
        if (localAddress) setAddress(localAddress)

    }, [])

    const onFormSubmit = (data) => {
        localStorage.setItem('shippingAddress', JSON.stringify(data));
        window.location = '/delivery';
    };

    return (
        <>
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h1>Shipping Address</h1>
                <Formik
                    initialValues={address || initialValues}
                    validationSchema={addressFormValidationSchema}
                    onSubmit={onFormSubmit}
                    enableReinitialize>
                    {() => (
                        <Form>
                            <Input label='Address*' name='address' type='text' />
                            <Input label='No. Of Street' name='street' type='text' />
                            <Input label='City*' name='city' type='select'  options={cities}/>
                            <Input label='Post Code' name='postalCode' type='text' />
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

export default Shipping;