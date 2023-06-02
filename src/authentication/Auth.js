import { useState } from "react";
import { Dashboard } from "screens";
import { BeforeAuthStack } from "stacks";

const Auth = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? <Dashboard /> : <BeforeAuthStack />;
};

export default Auth;
