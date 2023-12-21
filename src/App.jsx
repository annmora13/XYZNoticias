import React, { useState } from "react";
import { News } from "./News.jsx";
import SearchAppBar from "./componentes/barraBusqueda.jsx";
import FilterCategories from "./componentes/filterCategories.jsx";

export const App = () => {
  const [updatedNews, setUpdatedNews] = useState([]);
  console.log("updatedNew:s", updatedNews);

  return (
    <>
      <SearchAppBar setUpdatedNews={setUpdatedNews} />
      <FilterCategories setUpdatedNews={setUpdatedNews} />
      <News updatedNews={updatedNews} setUpdatedNews={setUpdatedNews} />
    </>
  );
};
