import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import SportsHandballSharpIcon from "@mui/icons-material/SportsHandballSharp";
import { components } from "../../types/openapi";
import { Typography } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import TransferWithinAStationSharpIcon from "@mui/icons-material/TransferWithinAStationSharp";

type Iprops = {
  events: components["schemas"]["FixtureEvents"][];
};

const EventTimeline = (props: Iprops) => {
  const { events } = props;
  return (
    <Timeline position="alternate">
      {events.map((ev) => (
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body1"
            color="text.secondary"
          >
            {ev.time?.elapsed}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />

            {ev.type === "Goal" ? (
              <TimelineDot color="success">
                <CelebrationIcon />
              </TimelineDot>
            ) : ev.type === "subst" ? (
              <TimelineDot color="info">
                <TransferWithinAStationSharpIcon />
              </TimelineDot>
            ) : (
              <TimelineDot color="warning">
                <SportsHandballSharpIcon />
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {ev.detail}
            </Typography>
            <Typography variant="h5">{ev.player?.name}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default EventTimeline;
