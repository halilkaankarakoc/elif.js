export interface State {
    next: () => void;
    stop: () => void;
    jumpTo: (conditionName: string) => void;
}