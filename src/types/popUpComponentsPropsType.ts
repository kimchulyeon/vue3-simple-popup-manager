export interface EmptyData {}

export interface CommonPopUpPropsType<T = EmptyData | undefined> {
  title?: string;
  isShow: boolean;
  close: () => void;
  buttonAction?: () => void;
  unMounted?: () => void;
  data?: T;
}
