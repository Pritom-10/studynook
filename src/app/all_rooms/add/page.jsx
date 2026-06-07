import Addproducts from "@/Component/Addproducts";
import React from "react";
import PrivateRoute from "@/Component/PrivateRoute";

const Addroom = () => {
  return (
    <PrivateRoute>
      <div>
        <Addproducts />
      </div>
    </PrivateRoute>
  );
};

export default Addroom;
