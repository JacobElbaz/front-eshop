import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import Input from "../Components/Input";
import { productFormValidationSchema } from "../validations";
import axios from "axios";
import { useSelector } from "react-redux";

function ProductEdit() {
  const user = useSelector((state) => state.userReducer);
  const [details, setDetails] = useState({
    user: user._id,
    name: "",
    image: null,
    category: "PS4",
    genre: "Action",
    description: "",
    price: "",
    countInStock: "",
    releaseDate: new Date().toISOString().split("T")[0],
  });
  const initialValues = {};

  const categoryOptions = [
    { title: "PS4", value: "PS4" },
    { title: "PS5", value: "PS5" },
    { title: "XBOX", value: "XBOX" },
    { title: "Switch", value: "Switch" },
  ];

  const genreOptions = [
    { title: "Action", value: "Action" },
    { title: "Adventure", value: "Adventure" },
    { title: "Fighting", value: "Fighting" },
    { title: "Racing", value: "Racing" },
    { title: "Role", value: "Role" },
    { title: "Shooter", value: "Shooter" },
    { title: "Sport", value: "Sport" },
    { title: "Strategy", value: "Strategy" },
    { title: "Other", value: "Other" },
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
    setDetails({ ...details, image: imageUrl });

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/product/`,
      data: {
        user: user._id,
        name: e.name,
        image: imageUrl,
        category: e.category || "PS4",
        genre: e.genre || "Action",
        description: e.description,
        price: e.price,
        countInStock: e.countInStock,
        releaseDate: new Date().toISOString().split("T")[0],
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          navigate("/admin/productList");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddRandom = async () => {
    const platforms = [
      { name: 'PS4', id: '18'},
      { name: 'PS5', id: '187'},
      { name: 'XBOX', id: '1'},
      { name: 'SWITCH', id: '7'},
    ];
    const randomIndex = Math.floor(Math.random() * (3 + 1));
    const platform = platforms[randomIndex];
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}api/product/getRandom/${platform.id}`
    );
    console.log(res.data);
    const game = res.data;
    console.log(game.name);
    const genre = game.genres ? game.genres[0].name : 'other';
    
    const data = {
      user: user._id,
      name: game.name,
      image: game.background_image,
      category: platform.name,
      genre: genre,
      description: game.id,
      price: 5,
      countInStock: 10,
      releaseDate: game.released,
    };

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/product/`,
      data: data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          navigate("/admin/productList");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <FormContainer>
        <h1>Add Product</h1>
        <Formik
          onSubmit={submitHandler}
          initialValues={initialValues}
          validationSchema={productFormValidationSchema}
          enableReinitialize
        >
          {() => (
            <Form>
              <Input
                label="Name"
                name="name"
                type="text"
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
              ></Input>

              <label htmlFor="image">Image:</label>
              <input
                type="file"
                name="image"
                id="validationFormik107"
                accept="image/*"
                className="form-control position position-relative mt-2"
                onChange={(e) => {
                  setDetails({ ...details, image: e.target.files[0] });
                }}
              />
              <Input
                label="Category"
                name="category"
                type="select"
                options={categoryOptions}
              ></Input>
              <Input
                label="Genre"
                name="genre"
                type="select"
                options={genreOptions}
              ></Input>
              <Input
                label="Descrition"
                name="description"
                type="textarea"
              ></Input>
              <Input label="Price" name="price" type="number"></Input>
              <Input
                label="Count In Stock"
                name="countInStock"
                type="number"
              ></Input>
              <Button
                className="d-block ml-auto"
                type="submit"
                variant="primary"
              >
                Add in stock
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
      <Button onClick={handleAddRandom}>Add random</Button>
    </>
  );
}

export default ProductEdit;
