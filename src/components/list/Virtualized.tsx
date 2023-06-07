import {
  ReactNode,
  UIEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ItemWrap, ListWrap, ScrollWrap } from "./list.styles";
import { Base } from "../interface";

export interface VirtualizedProps extends Base {
  height: number;
  itemCount: number;
  itemHeight: number[];
  render: (index: number) => ReactNode;
  alignTo?: number;
}

export const Virtualized = (props: VirtualizedProps) => {
  const [startAt, setStartAt] = useState(0);
  const [endAt, setEndAt] = useState(0);
  const dom = useRef<HTMLDivElement>(null);

  const itemMeta = useMemo(() => {
    const arr: { height: number; offset: number }[] = [];
    props.itemHeight.forEach((height, index) => {
      if (index === 0) {
        arr.push({ height, offset: 0 });
      } else {
        arr.push({ height, offset: height + arr[index - 1]?.offset });
      }
    });
    return arr;
  }, [props.itemHeight]);

  useEffect(() => {
    if (endAt === 0) setEndAt(findIndex(itemMeta, props.height));
  }, [itemMeta, endAt, props.height]);

  const listHeight = useMemo(() => {
    const meta = itemMeta[itemMeta.length - 1];
    return meta.height + meta.offset;
  }, [itemMeta]);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollOffset = Math.max(
      0,
      Math.min(scrollTop, scrollHeight - clientHeight)
    );
    const val1 = findIndex(itemMeta, scrollOffset);
    const val2 = findIndex(itemMeta, scrollOffset + clientHeight);
    setStartAt(val1);
    setEndAt(val2 + 1);
  };

  useEffect(() => {
    if (props.alignTo !== undefined && itemMeta[props.alignTo] && dom.current) {
      dom.current.scrollTo({
        top: itemMeta[props.alignTo]?.offset,
      });
    }
  }, [props.alignTo, itemMeta]);

  return (
    <ScrollWrap
      className={props.className}
      id={props.id}
      onScroll={onScroll}
      ref={dom}
      height={props.height}
    >
      <ListWrap
        className="list-wrap"
        height={listHeight}
        paddingTop={itemMeta[startAt].offset}
      >
        {Array(props.itemCount)
          .fill(true)
          .splice(startAt, endAt - startAt + 1)
          .map((_, index) => (
            <ItemWrap
              className={`item-wrap-${index + startAt}`}
              key={index + startAt}
              height={props.itemHeight[index + startAt]}
            >
              {props.render(index + startAt)}
            </ItemWrap>
          ))}
      </ListWrap>
    </ScrollWrap>
  );
};

const findIndex = (
  meta: { height: number; offset: number }[],
  limit: number
): number => {
  let lowIndex = 0;
  let highIndex = meta.length - 1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((highIndex + lowIndex) / 2);
    if (meta[midIndex]?.offset > limit) {
      highIndex = midIndex - 1;
    } else if (meta[midIndex + 1]?.offset < limit) {
      lowIndex = midIndex + 1;
    } else {
      return midIndex;
    }
  }

  return -1;
};
