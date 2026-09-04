import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useCurrency } from '../context/CurrencyContext';

const PAGE_TITLES = {
    // Əsas Səhifə
    '/': 'Flower Knows® Official Site | Live your fairytales – Flower Knows',

    // Kolleksiyalar & Kateqoriyalar
    '/collections/bunny-garden': 'Bunny Garden Collection | Flower Knows',
    '/collections/knight-unicorn-collection': 'Knight Unicorn Collection | Flower Knows',
    '/collections/the-sweetie-bear': 'The Sweetie Bear Collection | Flower Knows',
    '/collections/shells-jewel': "Shell's Jewel Collection | Flower Knows",
    '/collections/strawberry-cupid': 'Strawberry Cupid Collection | Flower Knows',
    '/collections/little-angel': 'Little Angel Collection | Flower Knows',
    '/collections/face': 'Face Makeup & Products | Flower Knows',
    '/collections/eyes': 'Eye Makeup | Flower Knows',
    '/collections/lips': 'Lip Makeup | Flower Knows',
    '/collections/accessories': 'Accessories & Tools | Flower Knows',
    '/collections/fragrance': 'Fragrance & Perfume | Flower Knows',
    '/shop-all': 'Shop All Products | Flower Knows',
    '/collections/all-products': 'Shop All Products | Flower Knows',
    '/collections/best-sellers': 'Best Sellers | Flower Knows',
    '/collections/limited-set': 'Limited Sets | Flower Knows',
    '/collections/all-in-gift-set': 'All-In Gift Sets | Flower Knows',
    '/collections/birthday': 'Birthday Collection | Flower Knows',
    '/collections/for-your-bestie': 'For Your Bestie | Flower Knows',
    '/products/gift-card': 'E-Gift Cards | Flower Knows',
    '/collections/sale': 'Sale - Up To 50% Off | Flower Knows',
    '/pages/offers': 'Long-term Offers | Flower Knows',
    '/collections/value-set': 'Gift Sets & Makeup Boxes | Flower Knows',

    // Əlavə Səhifələr & Siyasətlər
    '/pages/membership': 'Loyalty Program & Membership | Flower Knows',
    '/pages/affiliates': 'Affiliate Program | Flower Knows',
    '/pages/international-shipping-policy': 'International Shipping Policy | Flower Knows',
    '/pages/return-policy': 'Return & Refund Policy | Flower Knows',
    '/pages/promotion-terms-conditions': 'Promotion Terms & Conditions | Flower Knows',
    '/pages/privacy-policy': 'Privacy Policy | Flower Knows',
    '/pages/terms-and-conditions': 'Terms & Conditions | Flower Knows',
    '/pages/contact-us': 'Contact Us | Flower Knows',
    '/pages/track-order': 'Track Your Order | Flower Knows',

    // Hesab
    '/account/login': 'Log In / Register | Flower Knows'
};

function PageTitle() {
    const location = useLocation();
    const { formatPrice } = useCurrency();

    useEffect(() => {
        const path = location.pathname;

        // 1. Dinamik valyuta ilə Under səhifələri
        if (path === '/collections/under-50') {
            document.title = `Gifts Under ${formatPrice(50)} | Flower Knows`;
            return;
        }
        if (path === '/collections/under-75') {
            document.title = `Gifts Under ${formatPrice(75)} | Flower Knows`;
            return;
        }
        if (path === '/collections/under-100') {
            document.title = `Gifts Under ${formatPrice(100)} | Flower Knows`;
            return;
        }

        // 2. Dəqiq uyğun gələn marşrutlar
        if (PAGE_TITLES[path]) {
            document.title = PAGE_TITLES[path];
            return;
        }

        // 3. Məhsul detalları səhifəsi (/products/:slug)
        if (path.startsWith('/products/')) {
            const slug = path.replace('/products/', '').replace(/-/g, ' ');
            const formatted = slug
                .split(' ')
                .filter(Boolean)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            document.title = `${formatted} | Flower Knows`;
            return;
        }

        // 4. Default Başlıq
        document.title = 'Flower Knows® Official Site | Live your fairytales';
    }, [location, formatPrice]);

    return null;
}

export default PageTitle;