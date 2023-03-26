export default function TextInput({
  labelDescription = "Descrição",
  inputValue = "Valor padrão input",
  onInputChange = null,
  id = "id_do_input_text",
  autoFocus,
  children,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newName = currentTarget.value;
      onInputChange(newName);
    }
  }

  return (
    <div className="flex my-4 flex-col w-1/4">
      <span>
        <label htmlFor={id} className="text-sm mb-1">
          {labelDescription}
        </label>
        <input
          autoFocus={autoFocus}
          id={id}
          className="border p-1"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        {children}
      </span>
    </div>
  );
}
