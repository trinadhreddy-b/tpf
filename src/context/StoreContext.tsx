import React, { createContext, useContext, useState, useEffect } from 'react';
import { PodiItem, ThemeConfig, StoreSettings, CartItem, PodiWeightOption } from '../types';
import { THEME_PRESETS } from '../data/themePresets';
import { INITIAL_PODIS, INITIAL_SETTINGS } from '../data/initialPodis';
import { applyThemeToDOM, loadSavedTheme } from '../utils/themeEngine';

interface StoreContextType {
  podis: PodiItem[];
  theme: ThemeConfig;
  settings: StoreSettings;
  cart: CartItem[];
  searchQuery: string;
  activeCategory: string;
  selectedPodi: PodiItem | null;
  isCartDrawerOpen: boolean;
  isMenuDrawerOpen: boolean;
  isStoryModalOpen: boolean;
  isContactModalOpen: boolean;
  isThemeDrawerOpen: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setActiveCategory: (cat: string) => void;
  setSelectedPodi: (podi: PodiItem | null) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsMenuDrawerOpen: (open: boolean) => void;
  setIsStoryModalOpen: (open: boolean) => void;
  setIsContactModalOpen: (open: boolean) => void;
  setIsThemeDrawerOpen: (open: boolean) => void;

  // Theme Management
  setTheme: (theme: ThemeConfig) => void;
  updateThemeVariable: (key: keyof ThemeConfig, value: string) => void;
  resetThemeToDefault: () => void;

  // Cart & Ordering
  addToCart: (podi: PodiItem, weight?: PodiWeightOption, qty?: number) => void;
  updateCartQty: (podiId: string, weightGrams: number, qty: number) => void;
  removeFromCart: (podiId: string, weightGrams: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getWhatsAppOrderUrl: (customItems?: CartItem[], notes?: string) => string;
  getInstagramDmUrl: () => string;
}

const PODI_STORAGE_KEY = 'the_podi_factory_items_v1';
const SETTINGS_STORAGE_KEY = 'the_podi_factory_settings_v1';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Podis state initialized directly from hardcoded dataset
  const [podis] = useState<PodiItem[]>(INITIAL_PODIS);

  // 2. Theme state
  const [theme, setThemeState] = useState<ThemeConfig>(loadSavedTheme);

  // 3. Settings state initialized from hardcoded settings
  const [settings] = useState<StoreSettings>(INITIAL_SETTINGS);

  // 4. Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // 5. UI Navigation & Modals
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPodi, setSelectedPodi] = useState<PodiItem | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);

  // Apply theme on load and change
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Theme Management
  const setTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
  };

  const updateThemeVariable = (key: keyof ThemeConfig, value: string) => {
    const updated = {
      ...theme,
      [key]: value,
    };
    setThemeState(updated);
    applyThemeToDOM(updated);
  };

  const resetThemeToDefault = () => {
    setTheme(THEME_PRESETS[0]);
  };

  // Cart functions
  const addToCart = (podi: PodiItem, weight?: PodiWeightOption, qty: number = 1) => {
    const chosenWeight = weight || podi.weights[1] || podi.weights[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.podi.id === podi.id && ci.selectedWeight.grams === chosenWeight.grams
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, { podi, selectedWeight: chosenWeight, quantity: qty }];
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQty = (podiId: string, weightGrams: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(podiId, weightGrams);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.podi.id === podiId && item.selectedWeight.grams === weightGrams
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const removeFromCart = (podiId: string, weightGrams: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.podi.id === podiId && item.selectedWeight.grams === weightGrams)
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.selectedWeight.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getWhatsAppOrderUrl = (customItems?: CartItem[], notes?: string) => {
    const itemsToOrder = customItems || cart;
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');

    let text = `Namaste *${settings.storeName}*! 🙏\nI would like to place an authentic Podi order:\n\n`;

    if (itemsToOrder.length > 0) {
      itemsToOrder.forEach((item, idx) => {
        text += `${idx + 1}. *${item.podi.name}* (${item.selectedWeight.label}) - ${item.quantity} unit(s) @ ₹${item.selectedWeight.price * item.quantity}\n`;
      });
      const total = itemsToOrder.reduce((sum, it) => sum + it.selectedWeight.price * it.quantity, 0);
      text += `\n💰 *Estimated Total:* ₹${total}\n`;
    } else {
      text += `I would like to enquire about your fresh batch Karam Podis.\n`;
    }

    if (notes) {
      text += `\n📝 *Notes:* ${notes}\n`;
    }
    text += `\nPlease confirm batch availability & payment details. Thank you!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const getInstagramDmUrl = () => {
    const handle = settings.instagramHandle.replace('@', '');
    return `https://instagram.com/${handle}`;
  };

  return (
    <StoreContext.Provider
      value={{
        podis,
        theme,
        settings,
        cart,
        searchQuery,
        activeCategory,
        selectedPodi,
        isCartDrawerOpen,
        isMenuDrawerOpen,
        isStoryModalOpen,
        isContactModalOpen,
        isThemeDrawerOpen,

        setSearchQuery,
        setActiveCategory,
        setSelectedPodi,
        setIsCartDrawerOpen,
        setIsMenuDrawerOpen,
        setIsStoryModalOpen,
        setIsContactModalOpen,
        setIsThemeDrawerOpen,

        setTheme,
        updateThemeVariable,
        resetThemeToDefault,

        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        getWhatsAppOrderUrl,
        getInstagramDmUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
