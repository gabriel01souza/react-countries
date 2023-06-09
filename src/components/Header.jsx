export default function Header({ children }, size) {
    let fontSize = size;

    if (size === 'large') {
        fontSize = 'text-2xl';
    }
    return (
        <header>
            <div className="bg-green-500 mx-auto p-4">
                <h1 className={`text-center font-semibold ${fontSize}`}>
                    {children}
                </h1>
            </div>
        </header>
    );
}