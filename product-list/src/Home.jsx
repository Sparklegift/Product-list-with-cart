import { useEffect } from "react";
import { useState } from "react";


const Home = () => {

    const [data, setData] = useState([]);
    const [count, setCount] = useState({});
    const [selected, setSelected] = useState([]);
    const [comfirm, setComfirm] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);


    const handleComfirm = () => {      
        localStorage.setItem('selectedItems', JSON.stringify(selected));
        localStorage.setItem('itemCounts', JSON.stringify(count));
        localStorage.setItem('orderConfirmed', 'true');
        
        window.location.reload(); 
    };
      

    useEffect(() => {
        const orderConfirmed = localStorage.getItem('orderConfirmed');
      
        if (orderConfirmed === 'true') {
            const savedSelectedItems = localStorage.getItem('selectedItems');
            const savedItemCounts = localStorage.getItem('itemCounts');

            setComfirm(true); 
            setIsConfirmed(true);

            if (savedSelectedItems) {
                setSelected(JSON.parse(savedSelectedItems)); 
            }
      
            if (savedItemCounts) {
                setCount(JSON.parse(savedItemCounts));
            }

            localStorage.removeItem('orderConfirmed');
        }
    }, []);
      
      

    const handleClick = (action, index) => {
        if (!selected.some(item => item.index === index)) return;
      
            setCount((prevCount) => {
            const currentCount = prevCount[index] || 0;
      
            if (action === 'increment') {
                return { ...prevCount, [index]: currentCount + 1 };
            } else if (action === 'decrement') {
                const newCount = currentCount > 1 ? currentCount - 1 : 0;
                if (newCount === 0) {
                    setSelected((prevSelected) => prevSelected.filter(item => item.index !== index));
                }
                return { ...prevCount, [index]: newCount };
            }
        });
    };


    useEffect(() => {
        fetch('/data.json')
          .then((response) => response.json())
          .then((jsonData) => setData(jsonData))
          .catch((error) => console.error('Error fetching local data:', error));
    }, []);

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price);
    };

    
    const handleSelect = (index) => {
        setSelected((prevSelected) => {
            const itemData = data[index]; 
    
            if (prevSelected.some(item => item.index === index)) {
                return prevSelected.filter(item => item.index !== index);
            } else {
                setCount((prevCount) => ({
                    ...prevCount,
                    [index]: prevCount[index] || 1,
                }));
                return [...prevSelected, { index, ...itemData }];
            }
        });
    };


    const handleRemove = (index) => {
        setSelected((prevSelected) => {
            const updatedSelected = prevSelected.filter(item => item.index !== index);
            setCount((prevCount) => {
                const { [index]: _, ...rest } = prevCount;
                return rest;
            });
            return updatedSelected;
        });
    };
      

    const totalCount = selected.reduce((sum, item) => sum + (count[item.index] || 0), 0);

    const totalPrice = selected.reduce((sum, item) => sum + ((count[item.index] || 0) * (item.price || 0)), 0);



    return ( 
        <div>
            <div className="">
                <div className={`lg:flex lg:p-10 tablet:p-10 ${comfirm ? `z-0  brightness-50 bg-Rose-50 fixed` : `brightness-100`}`}>
                    <div>
                        <h1 className="font-extrabold text-4xl p-8 text-Rose-900">Desserts</h1>

                        <div className="grid lg:grid-cols-3">
                        {data.map((item, index) => (
                            <div key={index} className="m-5">
                                <div className="grid justify-items-center relative pb-10">
                                    <img className={`rounded-md lg:hidden
                                        ${selected.some(selectedItem => selectedItem.index === index)  &&'border-Red border-2'}`} 
                                        src={item.image.mobile} 
                                    />
                                    <img className={`rounded-md hidden lg:block
                                        ${selected.some(selectedItem => selectedItem.index === index)  &&'border-Red border-2'}`} 
                                        src={item.image.desktop} 
                                    />
                                    <button onClick={() => handleSelect(index)}  
                                        className={`w-6/12 lg:w-9/12 p-3 items-center sm:p-2 absolute bottom-3 flex justify-center gap-2 bg-Rose-50
                                             border-Rose-900 border font-semibold text-Rose-900 rounded-full 
                                        ${selected.some(selectedItem => selectedItem.index === index) ? 'Deselect hidden' : 'Select block'}`}
                                    >
                                        <img src="/images/icon-add-to-cart.svg" />
                                        <p>Add to Cart</p>
                                    </button>
                                    <button className={`w-6/12 lg:w-9/12 p-6 absolute flex justify-center items-center bottom-3 bg-Red font-semibold
                                         text-Rose-900 rounded-full 
                                         ${selected.some(selectedItem => selectedItem.index === index) ? `block` : `hidden`}`}
                                    >
                                        <div onClick={() => handleClick('decrement', index)} 
                                            disabled={!(selected.some(item => item.index === index))} 
                                            className={`w-4 h-4 bg-transparent border-Rose-50 border absolute left-4 flex justify-center rounded-full p-1`}
                                        >
                                            <img src="/images/icon-decrement-quantity.svg" />
                                        </div>
                                        <span className="text-Rose-50 font-semibold absolute">{count[index] || 0}</span>
                                        <div onClick={() => handleClick('increment', index)} 
                                            disabled={!selected.some(item => item.index === index)} 
                                            className={`w-4 h-4 bg-transparent border-Rose-50 border absolute right-4 flex justify-center rounded-full p-1`} 
                                        >
                                            <img src="/images/icon-increment-quantity.svg" />
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="text-Rose-400 grid gap-1">
                                    <h1>{item.category}</h1>
                                    <h1 className="text-Rose-900 font-semibold text-0.5xl">{item.name}</h1>
                                    <h1 className="text-Red font-semibold">{formatCurrency(item.price)}</h1>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className={`m-5 rounded-lg bg-Rose-50 p-5 grid lg:w-5/12 lg:h-5/6 relative ${totalCount === 0 ? ` gap-5` : `gap-9`}`}>
                        <h1 className="text-Red text-3xl font-bold">Your Cart ({totalCount})</h1>
                
                        <div className={`${totalCount === 0 ? `block` : `hidden`}`}>
                            <div className="flex justify-center pt-4">
                                <img src="/images/illustration-empty-cart.svg" />
                            </div>
                            <h1 className="text-Rose-500 text-center font-medium pt-4">Your added items will appear here</h1>
                        </div>

                
                        <div className={`grid gap-4 ${selected ? ` block` : `hidden`}`}>
                            {selected.map((item, index) => (
                                <div key={index} className="grid gap-4 items-center ">
                                    <div className="flex items-center">
                                        <div className="grid gap-2">
                                            <h1 className="text-Rose-900 sm:w-48 sm:truncate font-semibold">{item.name}</h1>
                                            <div className="flex gap-4">
                                                <h1  className="text-Red font-semibold">{count[item.index]}x</h1>
                                                <div className="flex items-center gap-1">
                                                    <h1 className="text-xs text-Rose-300">@</h1>
                                                    <h1 className="text-Rose-300">{item.price.toFixed(2)}</h1>
                                                </div>
                                                <h1 className="text-Rose-500">{formatCurrency((count[item.index] || 0) * (item.price || 0))}</h1>
                                            </div>
                                        </div>
                                        <div onClick={() => handleRemove(item.index)} disabled={isConfirmed} className={`w-5 h-5 border-Rose-500 rounded-full 
                                            border flex justify-center p-1 absolute right-6 
                                            ${isConfirmed ? 'cursor-not-allowed pointer-events-none' : ''}`}
                                        >
                                            <img src="/images/icon-remove-item.svg" />
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>

                        <div className={`flex items-center ${totalCount === 0 ? `hidden` : `block`}`}>
                            <h1 className="text-Rose-900">Order Total</h1>
                            <h1 className="absolute right-6 text-2xl font-extrabold">{formatCurrency(totalPrice)}</h1>     
                        </div> 
                    
                        <div className={`flex justify-center ${totalCount === 0 ? `hidden` : `block`}`}>
                            <div className="w-full p-4 bg-Rose-100 text-sm flex gap-2 justify-items-center rounded-md">
                                <img src="/images/icon-carbon-neutral.svg" />
                                <h1>This is a <b>Carbon-neutral</b> delivery</h1>
                            </div>
                        </div>
                        
                        <form>
                            <button onClick={handleComfirm} disabled={isConfirmed} 
                                className={`w-full p-4 bg-Red rounded-full text-Rose-50 font-semibold hover:bg-Red-dark ${totalCount === 0 ? `hidden` : `block`} 
                                ${isConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}>Confirm Order</button
                            >
                        </form>    
                    </div>
                </div>



                <div className={`absolute tablet:relative md:relative top-24 z-10 ${comfirm ? ` block ` : `hidden`}`}>
                    <div className=" md:flex tablet:flex justify-center ">
                        <div className=" w-screen tablet:w-10/12 desktop:w-4/12 rounded-xl grid gap-8 bg-Rose-50 p-6 pt-10">
                            <img className="w-10" src="/images/icon-order-confirmed.svg" />
                            <div className="grid gap-1">
                                <div className="lg:flex gap-2 tablet:flex ">
                                <h1 className="text-4xl lg:text-3xl font-extrabold">Order</h1>
                                <h1 className="text-4xl lg:text-3xl  font-extrabold">Confirmed</h1>
                                </div>
                                <h1 className="text-Rose-400">We hope you enjoy your food!</h1>
                            </div>
                            <div>
                                <div className={`grid w-full rounded-lg p-5 text-sm bg-Rose-100 gap-4 relative`}>
                                    {selected.map((item, index) => (
                                        <div key={index} className="grid gap-4 items-center ">
                                            <div className="flex items-center gap-4">
                                                <img className="rounded-md w-14" src={item.image.thumbnail} />
                                                <div className="grid gap-2">
                                                    <h1 className="text-Rose-900 truncate w-40 md:w-full font-semibold">{item.name}</h1>
                                                    <div className="flex gap-4">
                                                        <h1  className="text-Red font-semibold">{count[item.index]}x</h1>
                                                        <div className="flex items-center gap-1">
                                                            <h1 className="text-xs text-Rose-300">@</h1>
                                                            <h1 className="text-Rose-300">{item.price.toFixed(2)}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h1 className="text-Rose-900 font-semibold absolute right-5">
                                                    {formatCurrency((count[item.index] || 0) * (item.price || 0))}
                                                </h1>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}

                                    <div className={`flex items-center p-4`}>
                                        <h1 className="text-Rose-900">Order Total</h1>
                                        <h1 className="absolute right-6 text-2xl font-extrabold">{formatCurrency(totalPrice)}</h1>     
                                    </div>                
                                </div>
                            </div>

                            <form>
                                <button className={`w-full p-4 bg-Red rounded-full text-Rose-50 font-semibold hover:bg-Red-dark `}>Start New Order</button>
                            </form>
                        </div>            
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Home;