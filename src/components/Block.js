import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";

const Block = ({ block }) => {
  const classes = useStyles();

  function formatIndex(index) {
    return String(index).padStart(3, '0');
  }

  return (
    <Box bgcolor="grey.300" p={1} mb={0.5} borderRadius="2px">
      <Typography className={classes.index} variant="caption">{formatIndex(block.attributes.index)}</Typography>
      <Typography variant="body2">{block.attributes.data}</Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  index: {
    color: '#304FFE'
  }
}));

Block.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    attributes: PropTypes.shape({
      index: PropTypes.number,
      timestamp: PropTypes.number,
      data: PropTypes.string,
      "previous-hash": PropTypes.string,
      hash: PropTypes.string,
    })
  }).isRequired
};

export default Block;
