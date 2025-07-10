// Helper to import all images from a folder (Webpack/CRA compatible)
function importAll(r) {
  try {
    return r.keys().map(r);
  } catch {
    return [];
  }
}

export const products = [
  
  {
    key: 'ironturkish',
    title: 'ابواب مصفحه تركي',
    description: `باب تركي اصلي مستورد مصفح تصفيح كامل بخامات ممتازة و مزود بصوف صخري.. عازل للصوت و للأتربة و مضاد للحريق + ٤ كالون اصلي هوك و شفة للأمان لمنع التطفيش.. خباطة و عين سحرية و كامل الاكسسوارات مستوردة.. \nطلاء الكتروستاتك مضاد للصداء\nأحدث التصميمات هتلاقيها عندنا و أعلى جودة و أفضل سعر و اسرع تركيب في مصر ..كل دا عندنا و بس`,
    price: { current: 11950, old: 13500 },
    images: importAll(require.context('./media/ironturkish', false, /\.(jpg|jpeg|png)$/)),
  },
  {
    key: 'ironturkishsizes-150',
    title: 'ابواب مصفحه تركي مقاسات',
    description: `باب تركي اصلي مستورد مصفح تصفيح كامل بخامات ممتازة و مزود بصوف صخري.. عازل للصوت و للأتربة و مضاد للحريق + ٤ كالون اصلي هوك و شفة للأمان لمنع التطفيش.. خباطة و عين سحرية و كامل الاكسسوارات مستوردة.. \nطلاء الكتروستاتك مضاد للصداء\nأحدث التصميمات هتلاقيها عندنا و أعلى جودة و أفضل سعر و اسرع تركيب في مصر ..كل دا عندنا و بس`,
    size: '150cm',
    price: 17500,
    images: importAll(require.context('./media/ironturkishsizes/150', false, /\.(jpg|jpeg|png)$/)),
  },
  {
    key: 'ironturkishsizes-120',
    title: 'ابواب مصفحه تركي مقاسات',
    description: `باب تركي اصلي مستورد مصفح تصفيح كامل بخامات ممتازة و مزود بصوف صخري.. عازل للصوت و للأتربة و مضاد للحريق + ٤ كالون اصلي هوك و شفة للأمان لمنع التطفيش.. خباطة و عين سحرية و كامل الاكسسوارات مستوردة.. \nطلاء الكتروستاتك مضاد للصداء\nأحدث التصميمات هتلاقيها عندنا و أعلى جودة و أفضل سعر و اسرع تركيب في مصر ..كل دا عندنا و بس`,
    size: '120cm',
    price: 16500,
    images: importAll(require.context('./media/ironturkishsizes/120', false, /\.(jpg|jpeg|png)$/)),
  },
  {
    key: 'sweden',
    title: 'ابواب غرف وحمامات',
    description: 'باب خشب موسكى سويدي عليه طبقة pvc وحلق اكليرليك مقاوم للمياه والحراره',
    price: 'تبدا من 6500',
    images: importAll(require.context('./media/sweden', false, /\.(jpg|jpeg|png)$/)),
  },{
    key: 'barke',
    title: 'peli - legno باركيه',
    description: `باركيه 
                  الارضيات الباركيه hdf التركى 
                  الارضيات hdf التركى 8 ملى 
                  ارضيات تركى 8 ملى 
                  كلاس 21-31-32 
                  الوكيل الحصرى فى مصر لمصانع ارضيات peli - Legno `,
    price: null,
    images: importAll(require.context('./media/barke', false, /\.(jpg|jpeg|png)$/)),
  }
];

export function getProductByKeyAndIdx(key, idx) {
  const product = products.find(p => p.key === key);
  if (!product) return null;
  const image = product.images && product.images[idx] ? product.images[idx] : (product.images && product.images[0]);
  return { ...product, image, idx };
}

export const navItems = [
    {
        name: 'Home',
        link:'/'
    },{
        name:'Products',
        link: '/products'
    },{
        name: 'Contact',
        link: '/contact'
    }
]