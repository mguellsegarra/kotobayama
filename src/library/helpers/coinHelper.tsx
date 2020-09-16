import UserStore from '@library/mobx/userStore';

export const checkIfEnoughCoins = async ({
  userStore,
  amount,
}: {
  userStore: UserStore;
  amount: number;
}) => {
  return userStore.coins < amount;
};
