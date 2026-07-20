export interface Facility {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PromoTier {
  id: string;
  nightsRequired: number;
  title: string;
  discountPercent: number;
  freeNights: number;
  description: string;
  benefits: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'Exterior' | 'Bedroom' | 'Living Area' | 'Outdoor' | 'Garden' | 'Beach' | 'Sunset' | 'Bathroom' | 'Kitchen' | 'Hamara Story' | 'Waves';
  title: string;
}

export interface StayCalculation {
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: number;
  extraBeds: number;
  basePrice: number;
  extraBedPrice: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  freeNightsApplied: number;
  freeNightsDiscountAmount: number;
  totalPrice: number;
  appliedPromoTitle: string;
  whatsappMessage: string;
  guestType: 'domestic' | 'international';
  isSoloCouplePromo: boolean;
}
