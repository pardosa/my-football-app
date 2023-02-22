import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import RepeatIcon from "@mui/icons-material/Repeat";
import { components } from "../../types/openapi";
import { Typography } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

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
            variant="body2"
            color="text.secondary"
          >
            {ev.time?.elapsed}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              {ev.type === "Goal" ? (
                <CelebrationIcon />
              ) : ev.type === "Goal" ? (
                <PublishedWithChangesIcon />
              ) : (
                <RepeatIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {ev.type}
            </Typography>
            <Typography>{ev.player?.name}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default EventTimeline;
