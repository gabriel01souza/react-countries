export function SelectRegion({
  id = "id do seletor",
  onRegionClick = null,
  labelDescription = "Descrição do label",
  name = "",
}) {
  function handleSelectRegion({ target }) {
    if (onRegionClick) {
      let region = target.id;
      onRegionClick(region);
    }
  }

  return (
    <div>
      <input
        id={id}
        key={id}
        name={name}
        value={labelDescription}
        type="radio"
        className="m-1"
        onClick={handleSelectRegion}
      />
      <label htmlFor={id}>{labelDescription}</label>
    </div>
  );
}
