const BADGE_CLASSES = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-blue-100 text-blue-800',
    3: 'bg-purple-100 text-purple-800',
    4: 'bg-yellow-100 text-yellow-800',
    5: 'bg-gray-200 text-gray-800',
};

export function getBadgeClass(category) {
    return BADGE_CLASSES[category] ?? BADGE_CLASSES[5];
}
