import { ReactNode, useEffect, useState } from "react";
import { Base } from "../interface";
import { SelectInputGroup } from "../group/SelectInputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { SwitchBtn } from "./input.styles";

export interface Item {
  id: number | string;
  label: ReactNode;
}
export interface Pair {
  id?: number | string;
  item1: Item;
  item2: Item;
}

export interface SwapInputsProps extends Base {
  pairs: Pair[];
  fromItem: Item | undefined;
  toItem: Item | undefined;
  setFromItem: (val: Item | undefined) => void;
  setToItem: (val: Item | undefined) => void;
  fromAmount: string;
  setFromAmount: (val: string) => void;
  toAmount: string;
  setToAmount: (val: string) => void;
  fromRate?: (val: string) => string;
  toRate?: (val: string) => string;
  fromLabel?: string;
  toLabel?: string;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  fromPrefix?: string;
  toPrefix?: string;
  fromSuffix?: string;
  toSuffix?: string;
}

export const SwapInputs = (props: SwapInputsProps) => {
  const itemMap = useItemMap(props.pairs);
  const fromOptions = useAllItems(props.pairs);
  const toOptions = useMatchItems(props.pairs, props.fromItem);

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

  const setFromValue = (val: string) => {
    props.setFromAmount(val);
    if (props.toRate && !Number.isNaN(val)) {
      props.setToAmount(props.toRate(val));
    }
  };
  const setToValue = (val: string) => {
    props.setToAmount(val);
    if (props.fromRate && !Number.isNaN(val)) {
      props.setFromAmount(props.fromRate(val));
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
      />
      <SwitchBtn onClick={onSwitch} data-testid="button">
        <FontAwesomeIcon icon={faRepeat} />
      </SwitchBtn>
      <SelectInputGroup
        selected={props.toItem?.id}
        setSelected={selectTo}
        options={toOptions}
        value={props.toAmount}
        setValue={setToValue}
      />
    </>
  );
};

const useItemMap = (pairs: Pair[]) => {
  const [val, setVal] = useState<Map<string | number, Item>>(new Map());
  useEffect(() => {
    const map = new Map<string | number, Item>();
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
    const map = new Map<string | number, Item>();
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

const useMatchItems = (pairs: Pair[], item?: Item) => {
  const [items, setItems] = useState<
    { value: string | number; label: ReactNode }[]
  >([]);
  useEffect(() => {
    if (!item) {
      const map = new Map<string | number, Item>();
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
