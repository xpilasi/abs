/**
 * @type {import('./types.js').User}
 */
export const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b52a2c2a?w=150&h=150&fit=crop&crop=face',
  room: '305',
  checkIn: '2025-08-08',
  checkOut: '2025-08-12'
};

/**
 * @type {import('./types.js').Activity[]}
 */
export const mockActivities = [
  {
    id: '1',
    title: 'Morning Yoga',
    description: 'Start your day with a peaceful yoga session by the beach. Perfect for all skill levels.',
    category: 'wellness',
    duration: 60,
    capacity: 15,
    price: 25,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    location: 'Beach Pavilion',
    amenities: ['Yoga mats provided', 'Towels included', 'Ocean view'],
    instructor: 'Maya Rodriguez',
    difficulty: 'beginner'
  },
  {
    id: '2',
    title: 'Pool Time Slots',
    description: 'Reserve your private time at our infinity pool with stunning ocean views.',
    category: 'water',
    duration: 120,
    capacity: 8,
    price: 15,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    location: 'Infinity Pool',
    amenities: ['Pool towels', 'Poolside service', 'Lounge chairs'],
    difficulty: 'beginner'
  },
  {
    id: '3',
    title: 'Spa & Sauna',
    description: 'Relax and rejuvenate in our luxury spa with traditional Finnish sauna.',
    category: 'wellness',
    duration: 90,
    capacity: 6,
    price: 45,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    location: 'Wellness Center',
    amenities: ['Sauna access', 'Steam room', 'Relaxation area', 'Herbal teas'],
    difficulty: 'beginner'
  },
  {
    id: '4',
    title: 'Deep Tissue Massage',
    description: 'Professional therapeutic massage to release tension and restore balance.',
    category: 'wellness',
    duration: 60,
    capacity: 1,
    price: 85,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    location: 'Spa Suite 1',
    amenities: ['Essential oils', 'Hot towels', 'Aromatherapy'],
    instructor: 'Marcus Thompson'
  },
  {
    id: '5',
    title: 'Tennis Court',
    description: 'Book our professional tennis court with premium equipment and lighting.',
    category: 'sports',
    duration: 60,
    capacity: 4,
    price: 30,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop',
    location: 'Tennis Court A',
    amenities: ['Racket rental', 'Ball machine', 'Court lighting'],
    difficulty: 'intermediate'
  },
  {
    id: '6',
    title: 'Padel Court',
    description: 'Enjoy this exciting racket sport in our modern padel court.',
    category: 'sports',
    duration: 90,
    capacity: 4,
    price: 40,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
    location: 'Padel Court',
    amenities: ['Padel rackets', 'Premium balls', 'Court reservation'],
    difficulty: 'intermediate'
  },
  {
    id: '7',
    title: 'Surf Lessons',
    description: 'Learn to surf with our certified instructors on the perfect waves.',
    category: 'water',
    duration: 120,
    capacity: 6,
    price: 65,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
    location: 'Main Beach',
    amenities: ['Surfboard rental', 'Wetsuit included', 'Safety equipment'],
    instructor: 'Jake Miller',
    difficulty: 'beginner'
  },
  {
    id: '8',
    title: 'Island Excursion',
    description: 'Explore the beautiful nearby islands with snorkeling and lunch included.',
    category: 'experiences',
    duration: 480,
    capacity: 12,
    price: 120,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    location: 'Marina Departure',
    amenities: ['Boat transport', 'Snorkeling gear', 'Lunch included', 'Guide'],
    instructor: 'Captain Rodriguez'
  }
];

/**
 * Generate time slots for activities
 * @param {string} activityId 
 * @param {string} date 
 * @returns {import('./types.js').TimeSlot[]}
 */
export const generateTimeSlots = (activityId, date) => {
  const baseSlots = [
    { start: '08:00', end: '09:00' },
    { start: '09:30', end: '10:30' },
    { start: '11:00', end: '12:00' },
    { start: '14:00', end: '15:00' },
    { start: '15:30', end: '16:30' },
    { start: '17:00', end: '18:00' },
    { start: '18:30', end: '19:30' }
  ];

  return baseSlots.map((slot, index) => ({
    id: `${activityId}-${date}-${index}`,
    activityId,
    startTime: slot.start,
    endTime: slot.end,
    date,
    availableSpots: Math.floor(Math.random() * 8) + 2,
    totalSpots: 10
  }));
};

/**
 * @type {import('./types.js').Booking[]}
 */
export const mockBookings = [
  {
    id: '1',
    userId: '1',
    activityId: '1',
    timeSlotId: '1-2025-08-09-0',
    status: 'confirmed',
    bookedAt: '2025-08-08T10:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    activityId: '3',
    timeSlotId: '3-2025-08-10-2',
    status: 'confirmed',
    bookedAt: '2025-08-08T14:15:00Z'
  }
];
