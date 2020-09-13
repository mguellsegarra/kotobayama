export type AvailableLetterType = {
    id: string;
    letterState: AvailableLetterState;
    character: string;
  };
  
  export enum AvailableLetterState {
    Idle,
    Selected,
    Bought,
  }