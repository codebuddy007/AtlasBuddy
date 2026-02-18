import React, { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/PostApi";
import Loader from "../components/ui/Loader";
import CountryCard from "../components/layout/CountryCard";
import SearchFilter from "../components/ui/SearchFilter";

const Coutnry = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [searchedData, setSearchedData] = useState();
  const [filtered, setFiltered] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      console.log(res);
      setCountries(res.data);
    });
  }, []);

  // console.log(searchedData, filter)

  if (isPending) return <Loader />;

  const searchCountry = (country) => {
    if (searchedData) {
      return country.name.common
        .toLowerCase()
        .includes(searchedData.toLowerCase());
    } else {
      return country;
    }
  };

  const filterCountry = (country) => {
    if (filtered === "all") return country;
    return country.region === filtered;
  };

  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterCountry(country)
  );
  return (
    <section className="country-section">
      <SearchFilter
        filtered={filtered}
        setFiltered={setFiltered}
        searchedData={searchedData}
        setSearchedData={setSearchedData}
        countries={countries}
        setCountries={setCountries}
      />
      <ul className="grid grid-four-cols">
        {filterCountries.map((curCountry, index) => {
          return <CountryCard key={index} country={curCountry} />;
        })}
      </ul>
    </section>
  );
};

export default Coutnry;
