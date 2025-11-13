import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart as CartIcon, X, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { getCart, removeFromCart, updateCartQuantity, clearCart, type CartItem } from '../services/skincare-ai';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCart(getCart());
    }
  }, [isOpen]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
    setCart(getCart());
  };

  const removeItem = (productId: string) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCheckingOut(false);
    setOrderComplete(true);
    
    // Clear cart after 3 seconds
    setTimeout(() => {
      clearCart();
      setOrderComplete(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          <Card className="bg-white rounded-3xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                  <CartIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-purple-900">Shopping Cart</h3>
                  <p className="text-purple-600/70">{cart.length} items</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-purple-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6 overflow-y-auto max-h-96">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <CartIcon className="w-16 h-16 mx-auto mb-4 text-purple-300" />
                  <p className="text-purple-600/70">Your cart is empty</p>
                  <Button
                    onClick={onClose}
                    className="mt-4 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full px-6"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : orderComplete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-green-900 mb-2">Order Placed Successfully! 🎉</h3>
                  <p className="text-purple-600/70">
                    Your skincare products will arrive in 3-5 business days
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 p-4 bg-purple-50 rounded-2xl"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-purple-900 mb-1">{item.product.name}</h4>
                        <p className="text-purple-600/70 mb-2">{item.product.brand}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-900">₹{item.product.price}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-purple-100 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-purple-600" />
                            </button>
                            <span className="w-8 text-center text-purple-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-purple-100 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-purple-600" />
                            </button>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors ml-2"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && !orderComplete && (
              <div className="p-6 border-t border-purple-100 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-purple-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-purple-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-purple-600/70">Free shipping on orders over ₹1,000</p>
                  )}
                  <div className="flex justify-between text-purple-900 pt-2 border-t border-purple-200">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-6"
                >
                  {isCheckingOut ? 'Processing...' : `Checkout (₹${total})`}
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
