import React, { useContext } from "react";
import { Checkbox } from "antd";
import { TargetGroupBox } from "./Components";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

export default function TargetGroupSelector() {
  const { targetgroups, selectTargetGroups } = useContext(
    CreateLineBroadcastContext
  );
  const { checktargetgroups, checkTargetGroups } = useContext(
    CreateLineBroadcastContext
  );

  const onSelectTargetGroup = (key) => {
    let newtargetgroups = targetgroups;
    newtargetgroups[key].selected = !newtargetgroups[key].selected;
    selectTargetGroups(newtargetgroups);
  };

  return (
    <div>
      <Checkbox
        checked={checktargetgroups}
        onChange={() => checkTargetGroups(checktargetgroups)}
      >
        Target group
      </Checkbox>
      <div className="ml-3">
        {targetgroups.map((targetgroup, key) => {
          return (
            <div key={key} className="ml-2 mt-2 d-inline-block ">
              <TargetGroupBox
                className="font-small"
                selected={targetgroup.selected}
                checked={checktargetgroups}
                onClick={() => {
                  checktargetgroups ? onSelectTargetGroup(key) : "";
                }}
              >
                {targetgroup.targetgroupname}
              </TargetGroupBox>
            </div>
          );
        })}
      </div>
    </div>
  );
}
