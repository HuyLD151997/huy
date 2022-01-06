
import React from "react";
import { Route } from "react-router-dom";

const DefaultLayoutRouter = (props) => {
  const { component: YourComponent, ...remainsprops } = props;
 
  return (
    <Route
      {...remainsprops}
      render={(routeProps) => {
        return <YourComponent {...routeProps} />;
      }}
    />
  );
};

export default DefaultLayoutRouter;