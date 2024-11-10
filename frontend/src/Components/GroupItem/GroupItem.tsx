import React from "react";
import "./GroupItem.css";
import GroupLogo from "../GroupLogo/GroupLogo";
import { useNavigate } from "react-router-dom";
import { Event } from "@/shared/api/generated";

interface Props {
  event: Event;
}

const GroupItem = ({ event }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="group-item w-full"
      onClick={() => {
        if (event.id) {
          navigate(`/events/${event.id}`);
        }
        else {
          navigate(`/`);
        }
      }}
    >
      <GroupLogo name={event.name || ""} />
      <div className="body">
        <h4 className="ibm-plex-sans-medium">{event.name}</h4>
        {/*<p className='ibm-plex-sans-light'>{event.membersCount} {event.membersCount % 10 < 4 ? 'участника' : 'участников'}</p>*/}
      </div>
      <button className="arrow">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
              stroke-fill="#0F0F0F"
            ></path>{" "}
          </g>
        </svg>
      </button>
    </div>
  );
};

export default GroupItem;
