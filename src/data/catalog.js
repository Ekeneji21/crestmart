// Demo catalogue. Prices in USD. `vendor` is the marketplace seller; CrestMart earns
// a commission on each sale (see MARKETPLACE below).

export const CATEGORIES = [
    { id: 'solar', name: 'Solar & Power', icon: 'Sun', blurb: 'Beat load-shedding' },
    { id: 'tech', name: 'Phones & Tech', icon: 'Smartphone', blurb: 'Phones, laptops, accessories' },
    { id: 'home', name: 'Home & Kitchen', icon: 'Sofa', blurb: 'Appliances and essentials' },
    { id: 'hampers', name: 'Family Hampers', icon: 'Gift', blurb: 'Send groceries home' },
    { id: 'farm', name: 'Farm & Garden', icon: 'Sprout', blurb: 'Seed, tools, irrigation' },
];

export const PRODUCTS = [
    { id: 'sol-001', name: '3kVA Hybrid Inverter + 5kWh Lithium Battery', category: 'solar', price: 1890, compareAt: 2150, vendor: 'Sunvolt Harare', rating: 4.8, reviews: 126, stock: 7, badge: 'Bestseller',
        blurb: 'Keep lights, fridge, TV and Wi-Fi running through load-shedding. Charges from ZESA or solar.', specs: ['3kVA pure sine wave output', '5.12kWh LiFePO4, 6000 cycles', 'Wi-Fi monitoring app', 'Installation available in Harare and Bulawayo'] },
    { id: 'sol-002', name: '400W Mono Solar Panel', category: 'solar', price: 145, vendor: 'Sunvolt Harare', rating: 4.7, reviews: 88, stock: 40,
        blurb: 'High-efficiency panel. Four panels power a typical home inverter setup.', specs: ['400W, 21% efficiency', '25-year output warranty', 'MC4 connectors'] },
    { id: 'sol-003', name: 'Portable Power Station 600Wh', category: 'solar', price: 449, compareAt: 499, vendor: 'PowerHub ZW', rating: 4.6, reviews: 54, stock: 15, badge: 'Deal',
        blurb: 'Run laptops, routers and lights for a full working day. No installation.', specs: ['600Wh capacity', '4 AC + 4 USB outputs', 'Solar input up to 200W'] },
    { id: 'sol-004', name: 'Solar Security Floodlight (2-pack)', category: 'solar', price: 39, vendor: 'PowerHub ZW', rating: 4.4, reviews: 210, stock: 120,
        blurb: 'Motion-sensing yard lights that charge by day. No wiring needed.', specs: ['1200 lumens', 'Motion sensor', 'IP65 weatherproof'] },
    { id: 'tec-001', name: 'Samsung Galaxy A35 5G (128GB)', category: 'tech', price: 329, compareAt: 359, vendor: 'Mobile City', rating: 4.7, reviews: 301, stock: 22, badge: 'Deal',
        blurb: 'Big battery, great camera, dual SIM for Econet and NetOne.', specs: ['6.6" Super AMOLED', '5000mAh battery', '12-month local warranty'] },
    { id: 'tec-002', name: 'Lenovo IdeaPad 15" Laptop', category: 'tech', price: 549, vendor: 'Tech Avenue', rating: 4.5, reviews: 97, stock: 9,
        blurb: 'Reliable laptop for students and small businesses.', specs: ['Intel Core i5', '8GB RAM, 512GB SSD', 'Windows 11'] },
    { id: 'tec-003', name: '4G Mi-Fi Router', category: 'tech', price: 59, vendor: 'Mobile City', rating: 4.3, reviews: 144, stock: 60,
        blurb: 'Share one data bundle with up to 10 devices.', specs: ['Works on Econet and NetOne', '8-hour battery', 'Connect 10 devices'] },
    { id: 'tec-004', name: '20,000mAh Power Bank', category: 'tech', price: 25, vendor: 'Tech Avenue', rating: 4.6, reviews: 412, stock: 200, badge: 'Bestseller',
        blurb: 'Four phone charges. Fast-charge USB-C.', specs: ['20,000mAh', '22.5W fast charge', 'USB-C in and out'] },
    { id: 'hom-001', name: 'Gas Stove, 2 Plate + 9kg Cylinder', category: 'home', price: 89, vendor: 'HomeStore Avondale', rating: 4.5, reviews: 76, stock: 30,
        blurb: 'Cook through power cuts. Comes with regulator and hose.', specs: ['2 burners', '9kg cylinder (empty)', 'Regulator and hose included'] },
    { id: 'hom-002', name: 'Chest Freezer 200L (Low Energy)', category: 'home', price: 399, compareAt: 429, vendor: 'HomeStore Avondale', rating: 4.6, reviews: 63, stock: 6,
        blurb: 'Holds cold for up to 30 hours without power. Inverter-friendly.', specs: ['200 litres', 'A+ energy rating', 'Lock and key'] },
    { id: 'hom-003', name: 'Rechargeable LED Lantern', category: 'home', price: 14, vendor: 'PowerHub ZW', rating: 4.4, reviews: 520, stock: 300,
        blurb: 'Bright light for 12 hours, charges by USB or solar.', specs: ['300 lumens', 'USB and solar charging', 'Power bank function'] },
    { id: 'ham-001', name: 'Family Grocery Hamper (Large)', category: 'hampers', price: 95, vendor: 'CrestMart Fresh', rating: 4.9, reviews: 680, stock: 999, badge: 'Diaspora favourite',
        blurb: 'A month of basics for a family of four, delivered to their door.', specs: ['Mealie meal 20kg, rice 10kg', 'Cooking oil 5L, sugar 10kg', 'Flour, beans, soap, tea and more', 'Delivered in 48 hours'] },
    { id: 'ham-002', name: 'School Back-to-Term Pack', category: 'hampers', price: 45, vendor: 'CrestMart Fresh', rating: 4.8, reviews: 230, stock: 999,
        blurb: 'Stationery, exercise books and a school bag, ready for term.', specs: ['24 exercise books', 'Maths set, pens, pencils', 'Backpack'] },
    { id: 'ham-003', name: 'Granny Care Hamper', category: 'hampers', price: 65, vendor: 'CrestMart Fresh', rating: 4.9, reviews: 154, stock: 999,
        blurb: 'Groceries plus a blanket and toiletries for elderly parents.', specs: ['Groceries for one month', 'Fleece blanket', 'Toiletries'] },
    { id: 'frm-001', name: 'Drip Irrigation Kit (0.25 ha)', category: 'farm', price: 210, vendor: 'AgroLink', rating: 4.6, reviews: 41, stock: 18,
        blurb: 'Grow more with less water. Gravity-fed, no pump required.', specs: ['Covers 0.25 hectares', '1000L tank connection', 'Easy to install'] },
    { id: 'frm-002', name: 'Hybrid Maize Seed 10kg', category: 'farm', price: 38, vendor: 'AgroLink', rating: 4.7, reviews: 133, stock: 150,
        blurb: 'Drought-tolerant variety suited to regions II–IV.', specs: ['Drought tolerant', 'Matures in 120–130 days', 'Certified seed'] },
];

export const DELIVERY_ZONES = [
    { id: 'harare', name: 'Harare & Chitungwiza', fee: 5, eta: 'Next day' },
    { id: 'bulawayo', name: 'Bulawayo', fee: 6, eta: '1–2 days' },
    { id: 'other', name: 'Other towns', fee: 12, eta: '2–4 days' },
    { id: 'collect', name: 'Collect from a CrestMart point', fee: 0, eta: 'Same day' },
];

// How the marketplace earns, shown on the Sell page.
export const MARKETPLACE = {
    commission: 0.08,
    plusPrice: 5,
    plusPerks: ['Free delivery on orders over $50', 'Early access to deals', 'Priority installation booking'],
    sellerPlans: [
        { name: 'Starter', price: 0, commission: '8%', perks: ['List up to 50 products', 'EcoCash and card payouts weekly', 'Seller dashboard'] },
        { name: 'Pro Seller', price: 25, commission: '5%', perks: ['Unlimited products', 'Featured placement on Deals', 'Payouts in 48 hours', 'Sales analytics'] },
    ],
};

export const findProduct = (id) => PRODUCTS.find(p => p.id === id);
export const categoryName = (id) => CATEGORIES.find(c => c.id === id)?.name || id;
export const usd = (n) => `$${Number(n).toFixed(2)}`;
