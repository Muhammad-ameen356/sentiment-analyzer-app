import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

// Add more props if require multiple times
const Icon = ({ iconFrom, iconName, size, color, additionalProps }) => {
  const icons = {
    FontAwesome,
    Ionicons,
  };

  const GenericIcon = icons[iconFrom];
  return <GenericIcon name={iconName} size={size} color={color} {...additionalProps} />;
};

Icon.defaultProps = {
  iconFrom: "FontAwesome",
  iconName: "home",
  size: 30,
  color: "#000",
  additionalProps: {},
};

Icon.propTypes = {
  iconFrom: PropTypes.string,
  iconName: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  additionalProps: PropTypes.shape({}),
};

export default Icon;
