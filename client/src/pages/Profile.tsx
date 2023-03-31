import React from 'react';
import { useHistory} from "../api";
import KeyboardItem from "./KeyboardItem";

const Profile = () => {

    const {data, isLoading, error} = useHistory();

    if (isLoading) {
        return (
            <div className="minHeight">
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 py-4 minHeight">
            <div className="text-white">
                <h1 className="text-4xl font-bold">Purchase history</h1>
                <section className="card-container">
                    {data?.map((item: any) => (
                        <article key={item._id} className="card flex flex-col border border-2 rounded-2xl border-cyan-400 my-8 shadow-lg">
                            <div className="card-header flex w-full justify-between flex-wrap p-4">
                                <p className="text-lg">Payment type: {item.payment_type}</p>
                                <p className="text-lg">Purchase date: {item.purchase_date}</p>
                                <p className="text-lg">Total price: {item.total_price}$</p>
                            </div>
                            <div className="card-body flex flex-col w-full justify-between gap-8 p-4">
                                {item.keyboard_ids.map((keyboard:any, index:number) => (
                                    <KeyboardItem key={index} keyboard={keyboard} />
                                ))}
                            </div>
                        </article>
                    ))}
                </section>

            </div>
        </div>
    )
    };
    export {Profile};
