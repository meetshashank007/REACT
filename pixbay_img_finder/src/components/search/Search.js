import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import ImgResults from "../img-results/ImgResults";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

function Search() {
  const [values, setValues] = useState({
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api/",
    apiKey: "13811428-ea6e1a848d3107bd259eb75a4",
    images: []
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      if (values.searchText.length == 0) {
        setValues({ ...values, images: [] });
      } else {
        console.log("working here");
        axios
          .get(
            `${values.apiUrl}?key=${values.apiKey}&q=${values.searchText}&image_type=photo&per_page=${values.amount}&safesearch=true`
          )
          .then(res => setValues({ ...values, images: res.data.hits }))
          .catch(error => console.log(error));
      }
    }, 1000);
    return () => {
      console.log("Clean up code");
      clearTimeout(timer);
    };
  }, [values.searchText]);

  const handleChange = e => {
    setValues({ ...values, searchText: e.target.value });
  };
  const onAmountChange = e => {
    console.log("working");
    setValues({ ...values, amount: e.target.value });
  };

  return (
    <div>
      <TextField
        name="SearchText"
        value={values.searchText}
        id="standard-name"
        label="Search for Images"
        // className={classes.textField}
        fullWidth={true}
        onChange={handleChange}
        margin="normal"
      />
      <InputLabel htmlFor="amount-simple">Amount</InputLabel>
      <Select
        value={values.amount}
        onChange={onAmountChange}
        inputProps={{
          name: "amount",
          id: "amount-simple"
        }}
      >
        <MenuItem value={5}>Five</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={15}>Fifteen</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
        <MenuItem value={50}>Fifty</MenuItem>
      </Select>
      {values.images.length > 0 ? <ImgResults images={values.images} /> : null}
    </div>
  );
}

export default Search;
