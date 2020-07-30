import React from "react";
import { Helmet } from "react-helmet";
interface Props {}

const Home = (props: Props) => {
  return (
    <div>
      <Helmet>
        <title>FileLink &bull; Home</title>
      </Helmet>
      <h1>Hello</h1>
    </div>
  );
};

export default Home;
