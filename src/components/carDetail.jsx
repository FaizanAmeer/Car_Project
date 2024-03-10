"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useForm } from "react-hook-form";
import schema from "dd(@/Utility/formValidation)";
import { toast, Toaster } from "react-hot-toast";
import getToken from "dd(@/Utility/getToken)";

function CarDetail() {
  const [carModel, setCarModel] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maxPictures, setMaxPictures] = useState(5); // Default max pictures
  const [pictures, setPictures] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [urls, setUrls] = useState([]);
  const { handleSubmit, register } = useForm();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, maxPictures);
    const urls = files.map((file) => URL.createObjectURL(file));
    const newUrls = urls.filter((url) => typeof url === "string"); // Filter out non-URL values
    
    const limitedUrls = newUrls.slice(0, maxPictures); // Limit the number of pictures
    setPictures([...limitedUrls]);
    setImages([...files]);
  };

  const handleRemovePicture = (index) => {
    const updatedPictures = pictures.filter((_, i) => i !== index);
    const updateImages = images.filter((_, i) => i !== index);
    setPictures(updatedPictures);
    setImages(updateImages);
  };

  const handleViewImage = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (!images.length) {
        throw new Error("Please select Images");
      }
      await schema.validate(
        { carModel, price, phoneNumber, maxPictures },
        { abortEarly: false }
      );
      const formData = new FormData();
      images.forEach((image, i) => {
        formData.append(`Images`, image);
      });
      const sbUrls = [];
      if (!submit) {
        const sendImages = await fetch("api/uploadImages", {
          method: "POST",
          body: formData,
        });
        const data = await sendImages.json();

        if (!data.url) {
          throw new Error(data.error + "Please Try Again Later!!");
        }
        setUrls([...data.url]);
        sbUrls.push(...data.url);
      }
      
      const value = {
        carModel,
        price,
        phoneNumber,
        maxPictures,
        images: sbUrls.length > 0 ? sbUrls : urls,
      };
      
      const token = getToken(); ///here token avaliable
      const sendDetail = await fetch("api/add_car_detail", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(value),
      });
      const res = await sendDetail.json();
      if (!res.success) {
        throw new Error(res.message);
      }
      toast.success(res.message);
      window.location.href = window.location.href;
    } catch (e) {
      setSubmit(true);
      if (e.inner) {
        const newErrors = {};
        e.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        toast.error(e.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Toaster
        position="top-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Typography variant="h4" align="center" gutterBottom>
        Car Information
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("carModel")}
              label="Car Model"
              variant="outlined"
              fullWidth
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              required
              error={!!errors.carModel}
              helperText={errors?.carModel}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("price")}
              label="Price"
              variant="outlined"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              error={!!errors.price}
              helperText={errors?.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("phoneNumber")}
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              type="text" // Change type to text
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={!!errors.phoneNumber}
              helperText={errors?.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("maxPictures")}
              label="Max Number of Pictures"
              variant="outlined"
              type="number"
              fullWidth
              value={maxPictures ? maxPictures : 1}
              aria-valuemax={10}
              inputProps={{ min: 1, max: 10 }}
              onChange={(e) => setMaxPictures(parseInt(e.target.value))}
              error={!!errors.maxPictures}
              helperText={errors?.maxPictures}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload Picture
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#1976d2" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h5" align="center" gutterBottom>
        <Divider className="pt-2" />
      </Typography>
      <Grid container spacing={2}>
        {pictures?.map((picture, index) => (
          <Grid item key={index}>
            <Card
              style={{
                position: "relative",
                width: 120,
                overflow: "hidden",
                backfaceVisibility: "hidden",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector(".overlay").style.opacity = 1)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector(".overlay").style.opacity = 0)
              }
            >
              <CardMedia
                component="img"
                alt={`Picture ${index}`}
                image={picture}
                style={{ height: 140, overflow: "hidden" }}
              />
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backfaceVisibility: "hidden",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  opacity: 0,
                  overflow: "hidden",
                  transition: ".2s opacity",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#1565c0", display: "block" }}
                  onClick={() => handleViewImage(picture)}
                >
                  <VisibilityIcon />
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ backgroundColor: "#1565c0", color: "white" }}
                  onClick={() => handleRemovePicture(index)}
                >
                  <DeleteForeverIcon />
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedImage} onClose={handleCloseImage}>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImage}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CarDetail;
