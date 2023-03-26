import { Item } from "./Item";

export function Country({ 
    children: country, 
    onCountryClick = null, 
    isVisited=false 
}) {
  if (!country) {
    return <div>Impossível renderizar o país</div>;
  }

  function handleCountryClick() {
    if (onCountryClick) {
        onCountryClick(country.id);
    }
  }

  const demographicDensity = country.population / country.area;
  const { name, capital, population, region, area } = country;

  const isVisitedClassName = isVisited ? 'bg-blue-400' : '';

  // HTTP of the country (flag) is deprecated! And in this new http some images weren't found!
  let flag = `https://aimore.net/band/${name.trim()}.jpg`;

  return (
    <div
      className={`border border-black p-2 m-2 flex flex-row items-center space-x-2 cursor-pointer ${isVisitedClassName}`}
      onClick={handleCountryClick}
    >
      <img className="w-48" src={flag} alt={name} />
      <ul>
        <li>
          <Item label="Nome: ">{name}</Item>
        </li>
        <li>
          <Item label="Capital: ">{capital}</Item>
        </li>
        <li>
          <Item label="Região: ">{region}</Item>
        </li>
        <li>
          <Item label="População: ">{population}</Item>
        </li>
        <li>
          <Item label="Área: ">{area}</Item>
        </li>
        <li>
          <Item label="Densidade demografica: ">
            {demographicDensity.toFixed(5)}
          </Item>
        </li>
      </ul>
    </div>
  );
}
