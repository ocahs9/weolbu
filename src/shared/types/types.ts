export const applySort = (products: Product[], sortType: SortType) => {
	return products.sort(getSortFn(sortType));
};
