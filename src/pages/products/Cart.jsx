import React, { useContext } from 'react';
import { CartContext } from '../../App';
import { getProductByKeyAndIdx } from '../../data';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="cart-page-bg" style={{ minHeight: '80vh', background: '#f8fafc', padding: '32px 0' }}>
      <div className="cart-container" style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,34,60,0.07)', padding: 32 }}>
        <h1 style={{ fontSize: 28, color: '#1a237e', fontWeight: 800, marginBottom: 24 }}>سلة المشتريات</h1>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: 20, margin: '48px 0' }}>
            السلة فارغة
            <br />
            <button style={{ marginTop: 24, background: '#FFD34E', color: '#1a237e', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 18, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/products')}>تسوق الآن</button>
          </div>
        ) : (
          <>
            {/* Cart Table Responsive Wrapper */}
            <div className="cart-table-responsive" style={{ width: '100%', overflowX: 'auto', marginBottom: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead>
                  <tr style={{ background: '#f4f6fa', color: '#1a237e', fontWeight: 700 }}>
                    <th style={{ padding: 12, borderRadius: 8 }}>المنتج</th>
                    <th style={{ padding: 12 }}>المقاس</th>
                    <th style={{ padding: 12 }}>السعر</th>
                    <th style={{ padding: 12 }}>الكمية</th>
                    <th style={{ padding: 12 }}>الإجمالي</th>
                    <th style={{ padding: 12 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => {
                    const prod = getProductByKeyAndIdx(item.key, item.idx);
                    return (
                      <tr key={item.key + '-' + item.idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
                          <img src={item.image || (prod && prod.image)} alt={item.title} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
                          <span style={{ fontWeight: 600 }}>{item.title}</span>
                        </td>
                        <td style={{ padding: 12 }}>{item.size || (prod && prod.size) || '-'}</td>
                        <td style={{ padding: 12 }}>{item.price} EGP</td>
                        <td style={{ padding: 12 }}>
                          <input type="number" min={1} value={item.quantity || 1} onChange={e => updateQuantity(item.key, item.idx, Math.max(1, Number(e.target.value)))} style={{ width: 56, padding: 6, borderRadius: 6, border: '1px solid #ddd', textAlign: 'center' }} />
                        </td>
                        <td style={{ padding: 12, fontWeight: 700 }}>{item.price * (item.quantity || 1)} EGP</td>
                        <td style={{ padding: 12 }}>
                          <button onClick={() => removeFromCart(item.key, item.idx)} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600, cursor: 'pointer' }}>حذف</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#1a237e' }}>الإجمالي الكلي: {total} EGP</span>
              <button onClick={clearCart} style={{ background: '#bdbdbd', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>إفراغ السلة</button>
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <button style={{ background: '#FFD34E', color: '#1a237e', border: 'none', borderRadius: 8, padding: '16px 44px', fontSize: 20, fontWeight: 700, cursor: 'pointer' }} onClick={() => window.open('https://wa.me/+201009507136')}>إتمام الطلب عبر واتساب</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 