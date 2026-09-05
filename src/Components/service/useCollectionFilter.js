import { useMemo, useState } from 'react';
import { getProductFinalPrice } from './price';

export function useCollectionFilter(baseProducts, defaultCategory = 'ALL') {
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
    const [sortBy, setSortBy] = useState('featured');
    const [gridCols, setGridCols] = useState(4);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(null);

    const filteredProducts = useMemo(() => {
        let list = [...(baseProducts || [])];

        // 1. Kateqoriya Tab-ı
        if (selectedCategory !== 'ALL') {
            const cleanSelected = selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, '');

            list = list.filter((p) => {
                const cleanCat = (p.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const title = (p.title || '').toLowerCase();

                if (cleanSelected.includes('access') || cleanSelected.includes('tool')) {
                    return cleanCat.includes('access') || cleanCat.includes('tool');
                }
                if (cleanSelected === 'allin') {
                    if (title.includes('setting') || cleanCat.includes('setting')) return false;
                    return cleanCat === 'allin' || cleanCat === 'all-in' || title.includes('all-in') || title.includes('set') || title.includes('box');
                }

                return cleanCat === cleanSelected;
            });
        }

        // 2. Yan paneldəki Seçilmiş Tiplər (Product Types)
        if (selectedTypes.length > 0) {
            list = list.filter((p) => {
                const cleanCat = (p.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const title = (p.title || '').toLowerCase();

                return selectedTypes.some((t) => {
                    const cleanT = t.toLowerCase().replace(/[^a-z0-9]/g, '');

                    if (cleanT.includes('access') || cleanT.includes('tool')) {
                        return cleanCat.includes('access') || cleanCat.includes('tool');
                    }
                    if (cleanT === 'allin') {
                        if (title.includes('setting') || cleanCat.includes('setting')) return false;
                        return cleanCat === 'allin' || cleanCat === 'all-in' || title.includes('all-in') || title.includes('set') || title.includes('box');
                    }

                    return cleanCat.includes(cleanT);
                });
            });
        }

        // 3. Qiymət aralığı
        if (maxPrice !== null) {
            list = list.filter((p) => {
                const price = Number(getProductFinalPrice(p)) || 0;
                return price >= minPrice && price <= maxPrice;
            });
        }

        // 4. Qiymətə görə sıralama
        const sorted = [...list];
        if (sortBy === 'price-low') {
            sorted.sort((a, b) => getProductFinalPrice(a) - getProductFinalPrice(b));
        } else if (sortBy === 'price-high') {
            sorted.sort((a, b) => getProductFinalPrice(b) - getProductFinalPrice(a));
        }

        return sorted;
    }, [baseProducts, selectedCategory, selectedTypes, minPrice, maxPrice, sortBy]);

    const getGridClass = () => {
        if (gridCols === 2) return 'grid-cols-2';
        if (gridCols === 3) return 'grid-cols-2 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    };

    return {
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        gridCols,
        setGridCols,
        selectedTypes,
        setSelectedTypes,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        gridClass: getGridClass()
    };
}