import React from 'react';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {useWiki } from '../api'




const WikiDynamic = () => {
    const { id } = useParams();
    // @ts-ignore
    const { data, isLoading, error } = useWiki(id);

    if (isLoading) {
        return (
            <div className="minHeight flex justify-center items-center">
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 py-4">
            <div className="text-white minHeight">
                    <div key={data.order}>
                        <h1 className="text-3xl font-extrabold mb-8 text-center">{data.title}</h1>
                        {data.images.map((image: string, index: number) => (
                            <img key={index} src={image} alt={`Image ${index}`} className="mx-auto last:mb-8 my-4"/>
                        ))}
                        <p className="text-xl">{data.content}</p>
                    </div>
            </div>
        </div>
    );
};
export { WikiDynamic };
