export type Index = number | undefined;
export type SetIndex = React.Dispatch<React.SetStateAction<Index>>;

export interface ViewResult {
  id: number;
  display: string;
  correctness: boolean;
};

export type RowInfo<T extends ViewResult> = ({ row }: {
  row: T,
  initRad: boolean[] | null,
  save: (id: number, rad: boolean[]) => void
}) => JSX.Element;