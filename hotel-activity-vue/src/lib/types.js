/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 * @property {string} [room]
 * @property {string} [checkIn]
 * @property {string} [checkOut]
 */

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'wellness'|'sports'|'water'|'experiences'} category
 * @property {number} duration - in minutes
 * @property {number} capacity
 * @property {number} price
 * @property {string} image
 * @property {string} location
 * @property {string[]} amenities
 * @property {string} [instructor]
 * @property {'beginner'|'intermediate'|'advanced'} [difficulty]
 */

/**
 * @typedef {Object} TimeSlot
 * @property {string} id
 * @property {string} activityId
 * @property {string} startTime
 * @property {string} endTime
 * @property {string} date
 * @property {number} availableSpots
 * @property {number} totalSpots
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} userId
 * @property {string} activityId
 * @property {string} timeSlotId
 * @property {'confirmed'|'pending'|'cancelled'} status
 * @property {string} bookedAt
 * @property {string} [specialRequests]
 */

/**
 * @typedef {Activity & {timeSlots: TimeSlot[]}} ActivityWithSlots
 */

/**
 * @typedef {Booking & {activity: Activity, timeSlot: TimeSlot}} BookingWithDetails
 */

export {};
