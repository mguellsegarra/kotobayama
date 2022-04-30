import UserStore from '@library/mobx/userStore';

export const checkIfEnoughCoins = ({
  userStore,
  amount,
}: {
  userStore: UserStore;
  amount: number;
}) => {
  return userStore.coins >= amount;
};
