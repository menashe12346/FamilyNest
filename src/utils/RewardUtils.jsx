export const rewardsOptions = [
    { id: 1, reward: 'Golf', content: require('../assets/animations/rewards/golf.json') },
    { id: 2, reward: 'Beach day', content: require('../assets/animations/rewards/beach.json') },
    { id: 3, reward: 'Bicycle', content: require('../assets/animations/rewards/bicycle.json') },
    { id: 4, reward: 'Burger', content: require('../assets/animations/rewards/burger.json') },
    { id: 5, reward: 'Cash', content: require('../assets/animations/rewards/cash.json') },
    { id: 6, reward: 'Amusement Park', content: require('../assets/animations/rewards/ferris-wheel.json') },
    { id: 7, reward: 'Ice cream', content: require('../assets/animations/rewards/ice-cream.json') },
    { id: 8, reward: 'Movie night', content: require('../assets/animations/rewards/movie.json') },
    { id: 9, reward: 'Pizza', content: require('../assets/animations/rewards/pizza.json') },
    { id: 10, reward: 'Video game', content: require('../assets/animations/rewards/video-games.json') },
    { id: 11, reward: 'Mystery box', content: require('../assets/animations/rewards/box.json') },
    { id: 13, reward: 'Zoo', content: require('../assets/animations/rewards/tiger.json') },
    { id: 14, reward: 'New Shoes', content: require('../assets/animations/rewards/shoes.json') },
];

export const getContentByReward = (rewardName) => {
    const rewardItem = rewardsOptions.find(item => item.reward === rewardName);
    return rewardItem ? rewardItem.content : null; // Return content or null if not found
  };

  