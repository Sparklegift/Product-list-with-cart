const Comfirm = ({ data, selected, count }) => {
    return ( 
        <div className="absolute z-10">
            <div className=" w-screen rounded-xl bg-Rose-50">
            <img src="/images/icon-order-confirmed.svg" />
            <h1>Order</h1>
            <h1>Comfirmed</h1>
            <h1>We hope you enjoy your food!</h1>

            <div>
            <div className={`grid gap-4 ${selected ? ` block` : `hidden`}`}>
                        {selected.map((item, index) => (
                            <div key={index} className="grid gap-4 items-center ">
                        <div className="flex items-center">
                        <div className="grid gap-2">
                            <h1 className="text-Rose-900 font-semibold">{item.name}</h1>
                            <div className="flex gap-4">
                            <h1  className="text-Red font-semibold">{count[item.index]}x</h1>
                            <div className="flex items-center gap-1">
                                <h1 className="text-xs text-Rose-300">@</h1>
                            <h1 className="text-Rose-300">{item.price.toFixed(2)}</h1>
                            </div>
                            <h1 className="text-Rose-500">{formatCurrency((count[item.index] || 0) * (item.price || 0))}</h1>
                            </div>
                        </div>
                        <div onClick={() => handleRemove(item.index)} className="w-5 h-5 border-Rose-500 rounded-full border flex justify-center p-1 absolute right-6">
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

                    <button className={`w-full p-4 bg-Red rounded-full text-Rose-50 font-semibold ${totalCount === 0 ? `hidden` : `block`}`}>Comfirm Order</button>
            </div>
            </div>            
            </div>
     );
}
 
export default Comfirm;