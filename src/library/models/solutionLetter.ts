export enum SolutionLetterState {
    Empty,
    Filled,
    Bought,
  }
  
  export type SolutionLetterType = {
    id: string;
    character: string;
    availableLetterId: string | null;
    letterState: SolutionLetterState;
  };