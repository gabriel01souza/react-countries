import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Main from "../components/Main";
import { allCountries } from "../data/countries";
import { useState } from "react";
import { Countries } from "../components/countries";
import { Country } from "../components/Country";
import { regions } from "../data/countries";
import { SelectRegion } from "../components/SelectRegion";
import { ClearSearch } from "../components/ClearSearch";

export default function ReactCountriesPage() {
  const [countryFilter, setCountryFilter] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [regionSelected, setRegionSelected] = useState("");

  function handleCountryFilterChange(newContryFilter) {
    setCountryFilter(newContryFilter);
  }

  function handleSelectRegion(newRegion) {
    setRegionSelected(newRegion);
  }

  function handleClearSearchs() {
    setRegionSelected("");
    setCountryFilter("");
    document
      .getElementsByName("regions")
      .forEach((element) => (element.checked = false));
  }

  function toggleVisitedCountry(countryId) {
    let newVisitedContries = [...visitedCountries];

    const isCountryVisited = newVisitedContries.indexOf(countryId) !== -1;

    if (isCountryVisited) {
      newVisitedContries = newVisitedContries.filter(
        (visitedCountryId) => visitedCountryId !== countryId
      );
    } else {
      newVisitedContries.push(countryId);
    }
    setVisitedCountries(newVisitedContries);
  }

  const countryFilterLowerCase = countryFilter.trim().toLocaleLowerCase();

  // prettier-ignore
  const filteredContries =  haveRegionAndCountryFilter()
  ? allCountries.filter(({ nameLowerCase, region }) => {
    return nameLowerCase.includes(countryFilterLowerCase) && region === regionSelected;
  }) : haveCountryFilter()
  ? allCountries.filter(({ nameLowerCase, region }) => {
    return nameLowerCase.includes(countryFilterLowerCase);
  }) :  hasRegion() 
  ? filterPerRegion() : allCountries;

  function haveRegionAndCountryFilter() {
    return hasRegion() && haveCountryFilter();
  }

  function haveCountryFilter() {
    return countryFilterLowerCase.length >= 3;
  }

  function hasRegion() {
    return regionSelected.trim().length !== 0;
  }

  function filterPerRegion() {
    return allCountries.filter(({ region }) => region === regionSelected);
  }

  let classPage = filteredContries.length <= 3 ? "h-screen" : "";

  return (
    <div className={`bg-green-200 ${classPage}`} >
      <Header>react-countries</Header>
      <Main>
        <TextInput
          id="inputCountryFilter"
          labelDescription="Informe o nome do país (mínimo 3 caracteres)"
          inputValue={countryFilter}
          autoFocus
          onInputChange={handleCountryFilterChange}
        >
          <ClearSearch
            id="clear-search"
            textButton="Limpar"
            onClickClear={handleClearSearchs}
          />
        </TextInput>

        {regions.map((r) => {
          return (
            <div className="inline-block" key={r.id}>
              <SelectRegion
                key={r.id}
                id={r.id}
                labelDescription={r.nome}
                name="regions"
                onRegionClick={handleSelectRegion}
              />
            </div>
          );
        })}
        {/* <Countries      
         visitedCountries={visitedCountries}
         onCountryClick={toggleVisitedCountry}>         Here there's a problem of prop drilling
          {filteredContries}                            I solve it in the form of code below!
        </Countries> */}
        <div className="border border-black">
          <Countries>
            <h2 className="text-center font-semibold ">{`${filteredContries.length} país(es)`}</h2>
            <h3 className="text-center font-semibold text-sm">{`${visitedCountries.length} país(es) visitado(s)`}</h3>
            {filteredContries.map((country) => {
              const isVisited = visitedCountries.indexOf(country.id) !== -1;
              return (
                <Country
                  isVisited={isVisited}
                  key={country.id}
                  onCountryClick={toggleVisitedCountry}
                >
                  {country}
                </Country>
              );
            })}
            {
              filteredContries.length === 0 &&
              <div id="no-results" >
                  Nenhum resultado para esta pesquisa!
              </div>
            }
          </Countries>
        </div>
      </Main>
    </div>
  );
}
