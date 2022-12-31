import { createContext, useEffect, useState } from 'react';
//import PRODUCTS from '../shop-data.json';
//import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.util';

export const CategoriesContext =  createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({}); 

    //pre load data - one off
    /* 
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    },[]);
    */

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            //console.log(categoriesMap); 
            setCategoriesMap(categoriesMap);
        };
        getCategoriesMap();        
    },[]);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider>
    )
}