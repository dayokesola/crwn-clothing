import { useContext, Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context'; 

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext); 
    const randomItems = (arr, num) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }; 
    return ( 
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) =>
                    <CategoryPreview key={title}
                        title={title}
                        products={randomItems(categoriesMap[title], 4)}>
                    </CategoryPreview>
                )
            }
        </Fragment>
    )
}
export default CategoriesPreview;