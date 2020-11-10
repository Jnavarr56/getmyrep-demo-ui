import React from "react";
import PropTypes from "prop-types";
import { ADDRESS_MATCHES_SHAPE } from "../../../config/server";
import { List, ListItem, ListItemText } from "@material-ui/core";

const AddressMatchesList = (props) => {
  const { onSelectMatch, matches, selectedIndex } = props;
  return (
    <List>
      {matches.map(({ address }, currentIndex) => {
        const isSelected = currentIndex === selectedIndex;
        const handleClick = () =>
          onSelectMatch(isSelected ? null : currentIndex);
        return (
          <ListItem
            button
            key={address}
            selected={isSelected}
            onClick={handleClick}
          >
            <ListItemText primary={address} />
          </ListItem>
        );
      })}
    </List>
  );
};

AddressMatchesList.propTypes = {
  onSelectMatch: PropTypes.func.isRequired,
  matches: ADDRESS_MATCHES_SHAPE.isRequired,
  selectedIndex: PropTypes.oneOf([null, PropTypes.number]),
};

export default AddressMatchesList;
