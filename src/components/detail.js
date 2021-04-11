import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api from "../services/api";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    height: "100%",
    width: "100%",
  },
  paper: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    display: "flex",
    position: "relative",
  },
  floatingLeftButton: {
    margin: "2rem",
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  video: {
    overflow: "hidden",
    height: "100%",
  },
  details: {
    padding: "3vh",
    height: "100%",
  },
  sideImage: {
    width: "20rem",
  },
  smallMargin: {
    margin: ".5rem",
  },
});

const Detail = () => {
  const classes = useStyles();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const movieId = location.pathname.split("/movie/")[1];
    const fetchMovie = async () => {
      let request = await api.get(`/movie/${movieId}`);
      setMovieDetails(request.data);
    };
    fetchMovie();
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      {movieDetails ? (
        <PrimaryDetails movieDetails={movieDetails} />
      ) : (
        <Typography>No Video Found</Typography>
      )}
    </div>
  );
};

const PrimaryDetails = ({ movieDetails }) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.paper}>
      <BackButton className={classes.floatingLeftButton} />
      <video className={classes.video} id="videoPlayer" controls autoPlay>
        <source src="http://localhost:8000/video" type="video/mp4" />
      </video>
    </Grid>
  );
};

const BackButton = ({ className }) => {
  let history = useHistory();

  const handleBackButton = () => {
    history.push("/");
  };

  return (
    <Button
      onClick={handleBackButton}
      size="large"
      variant="contained"
      className={className}
      startIcon={<ArrowBackIcon />}
    >
      Back
    </Button>
  );
};

export default Detail;
