export function ClearSearch({
    id = "id button",
    textButton = "",
    onClickClear = null,
}) {

    function handleClear() {
        if (onClickClear) {
            onClickClear();
        }
    }

    return (
        <button id={id}  
            className="border-2 border-green-500  bg-green-500 ml-4 px-2"
            onClick={handleClear}
        >
            {textButton}
        </button>
    );
}