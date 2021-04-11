import React, { useState, useEffect } from "react";
import Content from "./components/content";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Player from "./components/player";
import Header from "./components/header";

function App() {
  const useStyles = makeStyles({
    content: {
      overflow: "auto",
      height: "auto",
      backgroundColor: "#282c34",
    },
  });

  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState(null);

  const handleSearch = (event) => {
    const searchString = event.target.value;
    setSearch(searchString.trim());
  };

  const handleRating = (event) => {
    const ratingValue = event.target.value * 2;
    if (ratingValue !== rating) {
      setRating(ratingValue);
    } else {
      // clear the filter
      setRating(null);
    }
  };

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      })
  );

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Header
          handleSearchChange={handleSearch}
          handleRatingChange={handleRating}
        />
        <Box className={classes.content}>
          <Switch>
            <Route path="/movie">
              <Player />
            </Route>
            <Route exact path="/">
              <Content query={search} rating={rating} />
            </Route>
          </Switch>
        </Box>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
