import React from "react";

const SearchFilter = ({
  searchedData,
  setSearchedData,
  filtered,
  setFiltered,
  countries,
  setCountries
}) => {
  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchedData(event.target.value);
  };
  const handleSelectChange = (event) => {
    event.preventDefault();
    setFiltered(event.target.value);
  };

  const sortedCountries = (value) => {
    const sortedCountry = [...countries].sort((a, b) => {
        return value === "asc"
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      });
      setCountries(sortedCountry)
  }



  return (
    <section className="section-searchFilter container">
      <input
        type="text"
        placeholder="Search"
        value={searchedData}
        onChange={handleInputChange}
      />

<div>
        <button onClick={() => sortedCountries("asc")}>Asc</button>
      </div>

      <div>
        <button onClick={() => sortedCountries("des")}>Desc</button>
      </div>

      <div>
        <select
          className="select-section"
          value={filtered}
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default SearchFilter;
