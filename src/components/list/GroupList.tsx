import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ReactNode,
  UIEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GroupItemWrap, GroupLabelWrap, GroupListWrap } from "./list.styles";
import classNames from "classnames";

export interface ItemInGroup {
  label: string;
  id: number | string;
  height: number;
}

export interface GroupListProps {
  groups: ItemInGroup[][];
  height: number;
  onLabelClicked?: (groupIndex: number) => void;
  onItemClicked?: (id: ItemInGroup["id"]) => void;
  alignLimit?: number;
}

export const GroupList = (props: GroupListProps) => {
  // Groups' unfoled heights. It's the default and max height of each group.
  const fullHeights = props.groups.map((group) =>
    group.reduce((sum, current) => sum + current.height, 0)
  );

  // DOM of the scroll wrap.
  const dom = useRef<HTMLDivElement>(null);

  // Index of the first visible group.
  const [startAt, setStartAt] = useState(0);
  // Index of the last visible group.
  const [endAt, setEndAt] = useState(0);
  // Folded or unfolded of each group. If folded, all the items other than the label will be hidden.
  const [folded, setFolded] = useState(Array(props.groups.length).fill(false));
  // Height of each group. The height changes when the group is folded or unfolded.
  const [heights, setHeights] = useState(fullHeights);

  // List's current height.
  const listHeight = useMemo(
    () => heights.reduce((sum, current) => sum + current, 0),
    [heights]
  );
  // Offset, to the top end of the list wrap, of each group.
  const offsets = useMemo(() => getOffsets(heights), [heights]);

  // Fold and unfold group by index. Height of the target group will change. Offsets of other groups will change.
  const handleFolded = (index: number) => {
    const hasFolded = folded[index];
    const newFolded = folded.concat();
    newFolded.splice(index, 1, !hasFolded);
    setFolded(newFolded);
    const newHeights = heights.concat();
    newHeights.splice(
      index,
      1,
      !hasFolded ? props.groups[index][0].height : fullHeights[index]
    );
    setHeights(newHeights);
  };

  // Find the visible groups according to the scrollTop of the whole list.
  const update = (offsets: number[]) => {
    if (!dom.current) return;
    const { scrollTop, scrollHeight, clientHeight } = dom.current;
    const scrollOffset = Math.max(
      0,
      Math.min(scrollTop, scrollHeight - clientHeight)
    );
    const val1 = findIndex(offsets, scrollOffset);
    const val2 = findIndex(offsets, scrollOffset + clientHeight);
    setStartAt(val1);
    setEndAt(val2 + 1);
  };

  // Update when the list scrolls.
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
    update(offsets);
  };

  // If the group's top end is invisible right now, it will scroll into view after clicking.
  // If not, the group will be folded or unfolded after clicking.
  // To judge whether the top end is far away enough to trigger scrolling instead of folding/unfolding, compare props.alignLimit to the distance.
  const labelOnClick = (groupIndex: number) => {
    if (dom.current) {
      if (
        dom.current.scrollTop - offsets[groupIndex] >
        (props.alignLimit || 20)
      ) {
        dom.current.scrollTo({ top: offsets[groupIndex], behavior: "smooth" });
      } else {
        handleFolded(groupIndex);
      }
    }
    if (props.onLabelClicked) props.onLabelClicked(groupIndex);
  };

  // Attach callback function when a certain item is clicked.
  const itemOnClick = (id: ItemInGroup["id"]) => {
    if (props.onItemClicked) props.onItemClicked(id);
  };

  // Initialize endAt.
  useEffect(() => {
    if (!offsets.length) return;
    if (endAt === 0) setEndAt(findIndex(offsets, props.height) + 1);
  }, [offsets, endAt, props.height]);

  // Update after any group's folding or unfolding.
  useEffect(() => update(offsets), [offsets]);

  return (
    <GroupListWrap height={props.height} onScroll={onScroll} ref={dom}>
      <div
        style={{
          height: `${listHeight}px`,
        }}
      >
        <div style={{ height: `${offsets[startAt]}px` }} />
        {props.groups.slice(startAt, endAt).map((group, index) => (
          <Group
            key={startAt + index}
            group={group}
            offset={offsets[startAt + index]}
            labelOnClick={() => labelOnClick(startAt + index)}
            itemOnClick={
              props.onItemClicked
                ? (id: ItemInGroup["id"]) => itemOnClick(id)
                : undefined
            }
            folded={folded[startAt + index]}
            groupHeight={heights[startAt + index]}
            isStart={index === 0}
          />
        ))}
      </div>
    </GroupListWrap>
  );
};

interface GroupProps {
  group: ItemInGroup[];
  offset: number;
  folded: boolean;
  groupHeight: number;
  labelOnClick: () => void;
  itemOnClick?: (id: ItemInGroup["id"]) => void;
  isStart?: boolean;
}

export const Group = (props: GroupProps) => {
  if (!props.group.length) return null;
  return (
    <>
      <GroupLabel
        height={props.group[0].height}
        onClick={props.labelOnClick}
        ac={!props.folded}
        zIndex={props.isStart ? 100 : 1}
      >
        {props.group[0].label}
      </GroupLabel>
      {props.folded ? null : (
        <>
          {props.group
            .slice(1, props.group.length + 1)
            .map((i: ItemInGroup, index: number) => (
              <GroupItem
                key={index}
                height={i.height}
                onClick={
                  props.itemOnClick
                    ? () => props.itemOnClick && props.itemOnClick(i.id)
                    : undefined
                }
              >
                {i.label}
              </GroupItem>
            ))}
        </>
      )}
    </>
  );
};

const GroupLabel = (props: {
  children: ReactNode;
  height: number;
  ac: boolean;
  zIndex: number;
  onClick: () => void;
}) => {
  return (
    <GroupLabelWrap
      height={props.height}
      zIndex={props.zIndex}
      onClick={props.onClick}
    >
      {props.children}
      <span className={classNames("spinner", { ac: props.ac })}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </span>
    </GroupLabelWrap>
  );
};

const GroupItem = (props: {
  children: ReactNode;
  height: number;
  onClick?: () => void;
}) => {
  return (
    <GroupItemWrap
      height={props.height}
      clickable={Boolean(props.onClick)}
      onClick={props.onClick}
    >
      {props.children}
    </GroupItemWrap>
  );
};

/**
 * Find the first visible item in the current list, and return it's index in array.
 * @param offsets - Top offset of each item in the list.
 * @param scrollTop - Length the list box scrolls.
 * @returns - Index of the first visible item.
 */
const findIndex = (offsets: number[], scrollTop: number): number => {
  let lowIndex = 0;
  let highIndex = offsets.length - 1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((highIndex + lowIndex) / 2);
    if (offsets[midIndex] > scrollTop) {
      highIndex = midIndex - 1;
    } else if (offsets[midIndex + 1] < scrollTop) {
      lowIndex = midIndex + 1;
    } else {
      return midIndex;
    }
  }

  return -1;
};

/**
 * Calculate items' offset by heights.
 * @param heights - Height of each item in the list.
 * @returns - Top offset of each item in the list.
 */
const getOffsets = (heights: number[]): number[] => {
  const origin = heights.concat();
  origin.pop();
  const arr: number[] = [0];
  origin.forEach((height, index) => {
    arr.push(arr[index] + height);
  });
  return arr;
};
