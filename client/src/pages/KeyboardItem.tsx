// @ts-ignore
const KeyboardItem = ({ keyboard }) => {
    const { product } = keyboard;
    const { images, brand, name, options } = product;
    const { option, price, quantity } = options[0];

    return (
        <div className="keyboard-item flex w-full justify-between items-center flex-wrap border-b last:border-none">
            <img src={images[0]} alt="" className="h-32" />
            <div className="keyboard-details text-lg my-4 md:my-0 md:p-8 w-2/3 md:w-auto">
                <p><span className="font-bold">Brand:</span> {brand}</p>
                <p><span className="font-bold">Name:</span> {name} - {option}</p>
                <p><span className="font-bold">Quantity:</span> {quantity} - <span className="font-bold">Price:</span> {price}</p>
            </div>
        </div>
    );
};

export default KeyboardItem;