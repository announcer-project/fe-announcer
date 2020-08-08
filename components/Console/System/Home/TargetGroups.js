import React from "react";
import styled from "styled-components";

const IconGroup = styled.img`
  height: 100%;
  width: auto;
  object-fit: cover;
`;

export default function TargetGroups({ targetgroups }) {
  return (
    <div className="px-3">
      <span className="font-large">Target group</span>
      <div style={{ borderBottom: "2px solid #050042" }}></div>
      {targetgroups.length === 0 ? (
        <div className="border p-5 text-center font-small color-drop mt-2">
          Not have target group
        </div>
      ) : (
        <div className="col-12">
          <div className="row">
            {targetgroups.map((targetgroup) => {
              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2">
                  <div className="col-12 border rounded shadow-sm px-2 px-sm-3 px-lg-5 py-4">
                    <div className="row">
                      <div className="col-5 text-right">
                        <IconGroup src="/img/Icon/group.png" />
                      </div>
                      <div className="col-7">
                        <span>{targetgroup.targetgroup_name}</span>
                        <br />
                        <span className="font-small color-drop">
                          {targetgroup.number_members} people
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
