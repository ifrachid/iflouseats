import landing from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

import RecentOrders from "../components/RecentOrders";
import { useKeycloak } from "react-keycloak-js";
import { useCreateMyUser } from "../api/MyUserApi";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);
  useEffect(() => {
    if (
      keycloak?.tokenParsed?.sub &&
      keycloak?.tokenParsed?.email &&
      !hasCreatedUser.current
    ) {
      createUser({
        auth0Id: keycloak.tokenParsed.sub,
        email: keycloak.tokenParsed.email,
      })
        .then(() => {
          hasCreatedUser.current = true;
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  }, [keycloak]);

  const { authenticated } = useKeycloak();
  const handleSearchSubmit = (searchFromValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFromValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-64">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center  -mt-[640px] 2xl:-mt-64">
        <h1 className="text-5xl font-bold tracking-tight text-green-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl ">Food is just a click away</span>
        {authenticated ? (
          <div className="flex flex-col gap-2">
            <RecentOrders />
            <SearchBar
              placeHolder="Search by City or Town"
              onSubmit={handleSearchSubmit}
              searchQuery={""}
            />
          </div>
        ) : (
          <SearchBar
            placeHolder="Search by City or Town"
            onSubmit={handleSearchSubmit}
            searchQuery={""}
          />
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landing} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span>Download the IFLOUSEats app now !</span>
          <img src={appDownload} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
