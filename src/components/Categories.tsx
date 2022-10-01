import React from 'react'
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];  

export const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => {

  // useWhyDidYouUpdate('Categories', { categoryId, onChangeCategory });
  
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
