import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import Input from '../Components/Input';
import { productFormValidationSchema } from '../validations';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {getProduct, updateProduct} from '../actions/products.action'




function EditProduct() {
    const product_id = useParams().id;
    const product_ = useSelector((state) => state.productReducer);
    console.log(product_id);
    console.log(product_);
    const [details, setDetails] = useState({});
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct(product_id));
    },[dispatch]);
  
  const categoryOptions = [
    { title: 'PS4', value: 'PS4' },
    { title: 'PS5', value: 'PS5' },
    { title: 'XBOX', value: 'XBOX' },
    { title: 'Switch', value: 'Switch' },
  ];

  const genreOptions = [
    { title: 'Action', value: 'Action' },
    { title: 'Adventure', value: 'Adventure' },
    { title: 'Fighting', value: 'Fighting' },
    { title: 'Racing', value: 'Racing' },
    { title: 'Role', value: 'Role' },
    { title: 'Shooter', value: 'Shooter' },
    { title: 'Sport', value: 'Sport' },
    { title: 'Strategy', value: 'Strategy' },
    { title: 'Other', value: 'Other' },
  ];

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    let imageUrl = "";

    const formData = new FormData();
    formData.append("file", details.image);
    formData.append("upload_preset", "cloudinary");
    const dataRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dgri8qgkg/image/upload",
      formData
    );
    imageUrl = dataRes.data.url;
    console.log(e);
    console.log(e.name);

    console.log(details);
    dispatch(updateProduct(product_id,{ 
      name: e.name,
      image: imageUrl,
      category: e.category || 'PS4',
      genre: e.genre || 'Action',
      description: e.description,
      price: e.price,
      countInStock: e.countInStock}));
      setShowModal(true);
    
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>This Game has been Updated</Modal.Body>
        <Modal.Footer>
          <Link
            type="button"
            className="btn btn-secondary"
            to={'/admin/productList'}
            onClick={handleClose}
          >
            OK
          </Link>
        </Modal.Footer>
      </Modal>
      <FormContainer>
        <h1>Update Product</h1>
        <Formik
          onSubmit={submitHandler}
          initialValues={product_}
          validationSchema={productFormValidationSchema}
          enableReinitialize>
          {() => (
            <Form>
              <Input label='Name' name='name' type='text'></Input>

              <label htmlFor="image">Image:</label>
              <input
                type="file"
                name="image"
                id="validationFormik107"
                accept='image/*'
                className='form-control position position-relative mt-2'
                onChange={(e) => { setDetails({ ...details, image: e.target.files[0] }) }}
              />
              <Input label='Category' name='category' type='select' options={categoryOptions}
              >
              </Input>
              <Input label='Genre' name='genre' type='select' options={genreOptions}>
              </Input>
              <Input label='Descrition' name='description' type='textarea'></Input>
              <Input label='Price' name='price' type='number'></Input>
              <Input label='Count In Stock' name='countInStock' type='number'></Input>
              <Button
                className='d-block ml-auto'
                type='submit'
                variant='primary'>
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
      
    </>

  )
}

export default EditProduct