import React from 'react'
import { Routes, Route } from 'react-router'
import Layout from '../layout/Layout'
import Index from '../pages/Index'
import ProductDetail from '../pages/ProductDetail'
import BunnyGarden from '../pages/BunnyGarden';
import QuickViewModal from '../common/QuickViewModal';
import KnightUnicorn from '../pages/KnightUnicorn'
import SweetieBear from '../pages/SweetieBear'
import ShellJewel from '../pages/ShellJewel'
import StrawberryCupid from '../pages/StrawberryCupid'
import LittleAngel from '../pages/LittleAngel'
import Face from '../pages/Face'
import Eyes from '../pages/Eyes'
import Lips from '../pages/Lips'
import Accessories from '../pages/Accessories'
import Fragrance from '../pages/Fragrance'
import ShopAll from '../pages/ShopAll'
import BestSellers from '../pages/BestSellers'
import LimitedSets from '../pages/LimitedSets'
import AllInGiftSets from '../pages/AllInGiftSets'
import Birthday from '../pages/Birthday'
import ForYourBestie from '../pages/ForYourBestie'
import GiftCard from '../pages/GiftCard'
import Under50 from '../pages/Under50'
import Under75 from '../pages/Under75'
import Under100 from '../pages/Under100'
import Sale from '../pages/Sale'
import LongTermOffer from '../pages/LongTermOffer'
import GiftSets from '../pages/GiftSets'
import PageTitle from '../common/PageTitle'
import AuthPage from '../pages/AuthPage'
import LoyaltyProgram from '../pages/LoyaltyProgram'
import Affiliates from '../pages/Affiliates'
import ShippingPolicy from '../pages/ShippingPolicy'
import RefundPolicy from '../pages/RefundPolicy'
import PromotionTerms from '../pages/PromotionTerms'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import TermsConditions from '../pages/TermsConditions'
import TrackOrder from '../pages/TrackOrder'
import ContactUs from '../pages/ContactUs'
function Router() {
    return (
        <>
            <PageTitle />
            <Routes>

                <Route path='/' element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path='products/:slug' element={<ProductDetail />} />
                    <Route path="/collections/bunny-garden" element={<BunnyGarden />} />
                    <Route path="/collections/knight-unicorn-collection" element={<KnightUnicorn />} />
                    <Route path="/collections/the-sweetie-bear" element={<SweetieBear />} />
                    <Route path="/collections/shells-jewel" element={<ShellJewel />} />
                    <Route path="/collections/strawberry-cupid" element={<StrawberryCupid />} />
                    <Route path="/collections/little-angel" element={<LittleAngel />} />
                    <Route path="/collections/face" element={<Face />} />
                    <Route path="/collections/eyes" element={<Eyes />} />
                    <Route path="/collections/lips" element={<Lips />} />
                    <Route path="/collections/accessories" element={<Accessories />} />
                    <Route path="/collections/fragrance" element={<Fragrance />} />
                    <Route path="/shop-all" element={<ShopAll />} />
                    <Route path="/collections/all-products" element={<ShopAll />} />
                    <Route path="/collections/best-sellers" element={<BestSellers />} />
                    <Route path="/collections/limited-set" element={<LimitedSets />} />
                    <Route path="/collections/all-in-gift-set" element={<AllInGiftSets />} />
                    <Route path="/collections/birthday" element={<Birthday />} />
                    <Route path="/collections/for-your-bestie" element={<ForYourBestie />} />
                    <Route path="/products/gift-card" element={<GiftCard />} />
                    <Route path="/collections/under-50" element={<Under50 />} />
                    <Route path="/collections/under-75" element={<Under75 />} />
                    <Route path="/collections/under-100" element={<Under100 />} />
                    <Route path="/collections/sale" element={<Sale />} />
                    <Route path="/pages/offers" element={<LongTermOffer />} />
                    <Route path="/collections/value-set" element={<GiftSets />} />
                    <Route path="/pages/membership" element={<LoyaltyProgram />} />
                    <Route path="/pages/affiliates" element={<Affiliates />} />
                    <Route path="/pages/international-shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/pages/return-policy" element={<RefundPolicy />} />
                    <Route path="/pages/promotion-terms-conditions" element={<PromotionTerms />} />
                    <Route path="/pages/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/pages/terms-and-conditions" element={<TermsConditions />} />
                    <Route path="/pages/contact-us" element={<ContactUs />} />

                </Route>
                <Route path="/account/login" element={<AuthPage />} />

                <Route path="/pages/track-order" element={<TrackOrder />} />
            </Routes>
            <QuickViewModal />
        </>
    )
}

export default Router