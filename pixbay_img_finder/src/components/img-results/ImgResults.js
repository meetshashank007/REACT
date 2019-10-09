import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1020,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ImgResults(props) {
  const classes = useStyles();

  const [values, setOpen] = useState({
    open: false,
    currentImg: null
  });

  const handleClickOpen = img => {
    console.log(img);
    setOpen({ open: true, currentImg: img });
  };

  const handleClose = () => {
    setOpen({ open: false });
  };

  return (
    <div className={classes.root}>
      <GridList cols={3}>
        {props.images.map(img => (
          <GridListTile key={img.id}>
            <img src={img.largeImageURL} alt="" />
            <GridListTileBar
              title={img.tags}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={handleClickOpen(img)}
                >
                  <ZoomInIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Dialog
        open={values.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {values.currentImg ? values.currentImg.user : null}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img
              src={values.currentImg ? values.currentImg.largeImageURL : ""}
              alt=""
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImgResults;
