import { ReactNode, useEffect, useRef, useState } from "react";
import { Base } from "../interface";
import { SelectInputGroup } from "../group/SelectInputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { SwitchBtn } from "./input.styles";
import { debounce } from "../hooks/debounce";

export interface TokenLabel {
  id: number | string;
  label: ReactNode;
}
export interface Pair {
  id?: number | string;
  item1: TokenLabel;
  item2: TokenLabel;
}

export interface SwapInputsProps extends Base {
  pairs: Pair[];
  fromItem: TokenLabel | undefined;
  toItem: TokenLabel | undefined;
  setFromItem: (val: TokenLabel | undefined) => void;
  setToItem: (val: TokenLabel | undefined) => void;
  fromAmount: string;
  setFromAmount: (val: string) => void;
  toAmount: string;
  setToAmount: (val: string) => void;
  getRate: (
    fromItemId: number | string,
    toItemId: number | string
  ) => Promise<[number, number]>;
  fromLabel?: string;
  toLabel?: string;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  fromPrefix?: string;
  toPrefix?: string;
  fromSuffix?: string;
  toSuffix?: string;
  fromDisabled?: boolean;
  toDisabled?: boolean;
}

export const SwapInputs = (props: SwapInputsProps) => {
  const itemMap = useItemMap(props.pairs);
  const fromOptions = useAllItems(props.pairs);
  const toOptions = useMatchItems(props.pairs, props.fromItem);
  const [fromLoading, setFromLoading] = useState(false);
  const [toLoading, setToLoading] = useState(false);

  const selectFrom = (val: string | number) => {
    const item = itemMap.get(val);
    if (item) {
      props.setFromItem(item);
      if (props.toItem) {
        const pair = props.pairs.find(
          (i) =>
            (i.item1.id === item.id && i.item2.id === props.toItem?.id) ||
            (i.item2.id === item.id && i.item1.id === props.toItem?.id)
        );
        if (!pair) {
          props.setToItem(undefined);
          props.setToAmount("");
        }
      }
    }
  };
  const selectTo = (val: string | number) => {
    const item = itemMap.get(val);
    if (item) props.setToItem(item);
  };

  const updateToAmount = useRef(
    debounce(async (fromItem: TokenLabel, toItem: TokenLabel, val: string) => {
      try {
        const [rate] = await props.getRate(fromItem.id, toItem.id);
        if (rate && !Number.isNaN(val)) {
          props.setToAmount((rate * Number(val)).toString());
        } else {
          props.setToAmount("");
        }
      } catch (err) {
        props.setToAmount("");
      } finally {
        setToLoading(false);
      }
    }, 500)
  ).current;
  const setFromValue = async (val: string) => {
    props.setFromAmount(val);
    if (props.fromItem && props.toItem) {
      setToLoading(true);
      updateToAmount(props.fromItem, props.toItem, val);
    }
  };

  const updateFromAmount = useRef(
    debounce(async (fromItem: TokenLabel, toItem: TokenLabel, val: string) => {
      try {
        const [_, rate] = await props.getRate(fromItem.id, toItem.id);
        if (rate && !Number.isNaN(val)) {
          props.setFromAmount((rate * Number(val)).toString());
        } else {
          props.setFromAmount("");
        }
      } catch (err) {
        props.setFromAmount("");
      } finally {
        setFromLoading(false);
      }
    }, 500)
  ).current;
  const setToValue = async (val: string) => {
    props.setToAmount(val);
    if (props.fromItem && props.toItem) {
      setFromLoading(true);
      updateFromAmount(props.fromItem, props.toItem, val);
    }
  };

  const onSwitch = () => {
    if (props.fromItem && props.toItem) {
      props.setFromItem(props.toItem);
      props.setToItem(props.fromItem);
    } else if (!props.fromItem && !props.toItem) {
      return;
    } else if (props.toItem) {
      props.setFromItem(props.toItem);
      props.setToItem(undefined);
    } else if (props.fromItem) {
      props.setFromItem(undefined);
      props.setToItem(props.fromItem);
    }
  };

  return (
    <>
      <SelectInputGroup
        selected={props.fromItem?.id}
        setSelected={selectFrom}
        options={fromOptions}
        value={props.fromAmount}
        setValue={setFromValue}
        placeholder={props.fromPlaceholder}
        disabled={props.fromDisabled}
        loading={fromLoading}
      />
      <SwitchBtn
        onClick={onSwitch}
        data-testid="button"
        disabled={props.fromDisabled && props.toDisabled}
      >
        <FontAwesomeIcon icon={faRepeat} />
      </SwitchBtn>
      <SelectInputGroup
        selected={props.toItem?.id}
        setSelected={selectTo}
        options={toOptions}
        value={props.toAmount}
        setValue={setToValue}
        placeholder={props.toPlaceholder}
        disabled={props.toDisabled}
        loading={toLoading}
      />
    </>
  );
};

const useItemMap = (pairs: Pair[]) => {
  const [val, setVal] = useState<Map<string | number, TokenLabel>>(new Map());
  useEffect(() => {
    const map = new Map<string | number, TokenLabel>();
    pairs.forEach((pair) => {
      map.set(pair.item1.id, pair.item1);
      map.set(pair.item2.id, pair.item2);
    });
    setVal(map);
  }, [pairs]);
  return val;
};

const useAllItems = (pairs: Pair[]) => {
  const [items, setItems] = useState<
    { value: string | number; label: ReactNode }[]
  >([]);
  useEffect(() => {
    const map = new Map<string | number, TokenLabel>();
    pairs.forEach((pair) => {
      map.set(pair.item1.id, pair.item1);
      map.set(pair.item2.id, pair.item2);
    });
    setItems(
      Array.from(map.values()).map(({ id, label }) => ({ value: id, label }))
    );
  }, [pairs]);
  return items;
};

const useMatchItems = (pairs: Pair[], item?: TokenLabel) => {
  const [items, setItems] = useState<
    { value: string | number; label: ReactNode }[]
  >([]);
  useEffect(() => {
    if (!item) {
      const map = new Map<string | number, TokenLabel>();
      pairs.forEach((pair) => {
        map.set(pair.item1.id, pair.item1);
        map.set(pair.item2.id, pair.item2);
      });
      setItems(
        Array.from(map.values()).map(({ id, label }) => ({ value: id, label }))
      );
    } else {
      const matched_1 = pairs
        .filter((i) => i.item1.id === item?.id)
        .map((pair) => ({ value: pair.item2.id, label: pair.item2.label }));
      const matched_2 = pairs
        .filter((i) => i.item1.id !== item?.id && i.item2.id === item?.id)
        .map((pair) => ({ value: pair.item1.id, label: pair.item1.label }));
      setItems(matched_1.concat(matched_2));
    }
  }, [pairs, item]);
  return items;
};
