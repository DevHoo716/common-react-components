import { ReactNode, useEffect, useRef, useState } from "react";
import { Base } from "../interface";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Virtualized, VirtualizedRef } from ".";
import { GroupListWrap, LabelWrap, ToggleBtn } from "./list.styles";

export interface Group {
  title: ReactNode;
  labelHeight: number;
  items: {
    value: string | number;
    label: ReactNode;
    itemHeight: number;
  }[];
}

export interface ItemProps {
  height: number;
  label: ReactNode;
  isGroupLabel: boolean;
  groupIndex: number;
  itemIndex?: number;
}

export interface GroupListProps extends Base {
  height: number;
  groups: Group[];
  onClick?: (value: string | number) => void;
  foldByDefaul?: boolean;
  handleClickOnItem?: (value: string | number) => void;
}

export const GroupList = (props: GroupListProps) => {
  const [folded, setFolded] = useState<boolean[]>(
    Array(props.groups.length).fill(props.foldByDefaul)
  );
  const [items, setItems] = useState<ItemProps[]>([]);
  const [groupItemIndex, setGroupItemIndex] = useState(0);
  const ref = useRef<VirtualizedRef>(null);

  useEffect(() => {
    const arr: ItemProps[] = [];
    props.groups.forEach((group, index) => {
      arr.push({
        label: group.title,
        height: group.labelHeight,
        isGroupLabel: true,
        groupIndex: index,
      });
      if (!folded[index]) {
        group.items.forEach((item, idx) => {
          arr.push({
            label: item.label,
            height: item.itemHeight,
            isGroupLabel: false,
            groupIndex: index,
            itemIndex: idx,
          });
        });
      }
    });
    setItems(arr);
  }, [props.groups, folded]);

  const toggleGroup = (index: number) => {
    if (props.groups[index]) {
      const arr = folded.concat();
      arr[index] = !folded[index];
      setFolded(arr);
    }
  };

  return (
    <GroupListWrap height={props.height}>
      {items[groupItemIndex] ? (
        <LabelWrap height={items[groupItemIndex].height}>
          <Toggle
            label={items[groupItemIndex].label}
            ac={!folded[items[groupItemIndex].groupIndex]}
            onClick={() => {
              const startAt = ref.current?.getStartAt();
              if (
                startAt !== undefined &&
                items[startAt] &&
                groupItemIndex !== startAt
              ) {
                ref.current?.alignTo(groupItemIndex);
              } else {
                toggleGroup(items[groupItemIndex].groupIndex);
              }
            }}
          />
        </LabelWrap>
      ) : null}
      <Virtualized
        height={props.height}
        itemCount={items.length}
        itemHeight={items.map((i) => i.height)}
        render={(index) => {
          const i = items[index];
          if (i.isGroupLabel) {
            return (
              <Toggle
                label={i.label}
                ac={!folded[i.groupIndex]}
                onClick={() => {
                  toggleGroup(i.groupIndex);
                }}
              />
            );
          } else {
            return <div className="group-item">{i.label}</div>;
          }
        }}
        ref={ref}
        onScroll={(direction: "forward" | "backward") => {
          const startAt = ref.current?.getStartAt();
          if (startAt !== undefined && items[startAt]?.isGroupLabel) {
            if (direction === "forward") {
              setGroupItemIndex(startAt);
            } else {
              const prev = items.findIndex(
                (i) => i.groupIndex === items[startAt].groupIndex - 1
              );
              setGroupItemIndex(prev);
            }
          }
        }}
      />
    </GroupListWrap>
  );
};

const Toggle = (props: {
  label: ReactNode;
  onClick: () => void;
  ac: boolean;
}) => {
  return (
    <ToggleBtn className="group-toggle" onClick={props.onClick}>
      <span>{props.label}</span>
      <FontAwesomeIcon
        className={classNames("spinner", { ac: props.ac })}
        icon={faCaretDown}
      />
    </ToggleBtn>
  );
};
