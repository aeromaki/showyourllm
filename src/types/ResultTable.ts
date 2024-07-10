export type Index = number | undefined;
export type SetIndex = React.Dispatch<React.SetStateAction<Index>>;

export interface ViewResult {
  id: number;
  display: string;
  correctness: boolean;
};

export type RowInfo<T> = ({ row }: {
  row: ViewResult & T
}) => JSX.Element;