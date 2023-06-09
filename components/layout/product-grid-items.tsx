import CategoryCard from '#/components/categoryCard'

export default function ProductGridItems({ categories }:any) {

    return (
        categories.map((category:any) => (
            category.top ?
            <CategoryCard key={category.categori_id} category={category} /> 
            : null
        ))
    )
}