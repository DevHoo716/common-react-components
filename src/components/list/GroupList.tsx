import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ReactNode,
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GroupItemWrap, GroupLabelWrap, GroupListWrap } from "./list.styles";

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
  // List's height when every group is unfolded. It's the default and max height of the group list.
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
  // The index interval of the visible items in the first visible group.
  const [intervalInStartAt, setIntervalInStartAt] = useState<
    [number, number] | undefined
  >(undefined);
  // The index interval of the visible items in the last visible group.
  const [intervalInEndAt, setIntervalInEndAt] = useState<
    [number, number] | undefined
  >(undefined);

  // List's current height.
  const listHeight = useMemo(
    () => heights.reduce((sum, current) => sum + current, 0),
    [heights]
  );
  // Offset, to the top end of the list wrap, of each group.
  const offsets = useMemo(() => getOffsets(heights), [heights]);
  // Offset, to the top end of the group wrap, of each item in the first visible group.
  const offsetsInStartGroup = useMemo(
    () => getOffsets(props.groups[startAt].map((i) => i.height)),
    [props.groups, startAt]
  );
  // Offset, to the top end of the group wrap, of each item in the last visible group.
  const offsetsInEndGroup = useMemo(() => {
    if (startAt + 1 === endAt || !props.groups[endAt - 1]) return undefined;
    return getOffsets(props.groups[endAt - 1].map((i) => i.height));
  }, [props.groups, startAt, endAt]);

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
  // Find the visible items in the first visible group.
  const updateInStartGroup = useCallback(
    (offsets: number[]) => {
      if (!dom.current) return setIntervalInStartAt(undefined);
      const { scrollTop, scrollHeight, clientHeight } = dom.current;
      const scrollOffset = Math.max(
        0,
        Math.min(scrollTop, scrollHeight - clientHeight) - offsets[startAt]
      );
      const val1 = findIndex(offsetsInStartGroup, scrollOffset);
      const val2 =
        startAt + 1 === endAt
          ? findIndex(offsetsInStartGroup, scrollOffset + clientHeight)
          : offsetsInStartGroup.length;
      setIntervalInStartAt([val1, val2 + 1]);
    },
    [offsetsInStartGroup, startAt, endAt]
  );
  // Find the visible items in the last visible group.
  const updateInEndGroup = useCallback(
    (offsets: number[]) => {
      if (!endAt || startAt + 1 === endAt || !offsetsInEndGroup || !dom.current)
        return;
      const { scrollTop, scrollHeight, clientHeight } = dom.current;
      const scrollOffset =
        Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)) +
        clientHeight -
        offsets[endAt - 1];
      const val = findIndex(offsetsInEndGroup, scrollOffset);
      setIntervalInEndAt([0, val + 1]);
    },
    [offsetsInEndGroup, startAt, endAt]
  );

  // Update when the list scrolls.
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
    update(offsets);
    updateInStartGroup(offsets);
    updateInEndGroup(offsets);
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
  useEffect(() => {
    update(offsets);
    updateInStartGroup(offsets);
    updateInEndGroup(offsets);
  }, [offsets, updateInStartGroup, updateInEndGroup]);

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
            itemOnClick={(id: ItemInGroup["id"]) => itemOnClick(id)}
            folded={folded[startAt + index]}
            groupHeight={heights[startAt + index]}
            interval={
              index === 0
                ? intervalInStartAt
                : index === endAt - startAt - 1
                ? intervalInEndAt
                : undefined
            }
            innerOffset={
              index === 0 && intervalInStartAt
                ? offsetsInStartGroup[intervalInStartAt[0]]
                : undefined
            }
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
  interval?: [number, number];
  innerOffset?: number;
}

export const Group = (props: GroupProps) => {
  const dom = useRef<HTMLDivElement>(null);

  if (!props.group.length) return null;
  return (
    <div
      ref={dom}
      style={{
        height: `${props.groupHeight}px`,
      }}
    >
      {props.folded ? (
        <GroupLabel
          height={props.group[0].height}
          onClick={props.labelOnClick}
          ac={false}
        >
          {props.group[0].label}
        </GroupLabel>
      ) : props.interval ? (
        <>
          <GroupLabel
            height={props.group[0].height}
            onClick={props.labelOnClick}
            ac={false}
          >
            {props.group[0].label}
          </GroupLabel>
          {props.interval[0] > 0 && props.innerOffset !== undefined && (
            <div
              style={{
                height: `${props.innerOffset - props.group[0].height}px`,
              }}
            />
          )}
          {props.group
            .slice(Math.max(1, props.interval[0]), props.interval[1])
            .map((i: ItemInGroup, index: number) => (
              <GroupItem
                key={index}
                height={i.height}
                onClick={() =>
                  props.itemOnClick ? props.itemOnClick(i.id) : undefined
                }
              >
                {i.label} {index + Math.max(1, (props.interval || [0])[0])}
              </GroupItem>
            ))}
        </>
      ) : (
        <>
          {props.group.map((i: ItemInGroup, index: number) =>
            !index ? (
              <GroupLabel
                key={index}
                height={i.height}
                onClick={props.labelOnClick}
                ac
              >
                {i.label}
              </GroupLabel>
            ) : (
              <GroupItem
                key={index}
                height={i.height}
                onClick={() =>
                  props.itemOnClick ? props.itemOnClick(i.id) : undefined
                }
              >
                {i.label} {index}
              </GroupItem>
            )
          )}
        </>
      )}
    </div>
  );
};

const GroupLabel = (props: {
  children: ReactNode;
  height: number;
  ac: boolean;
  onClick: () => void;
}) => {
  return (
    <GroupLabelWrap height={props.height} onClick={props.onClick}>
      {props.children}
      <span
        className="spinner"
        style={{
          transform: `rotate(${props.ac ? 90 : 0}deg)`,
        }}
      >
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
