import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
//import { tokensDark, tokensLight } from "../../theme";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
 
} from "@mui/material";
import Header from "../../components/Header";
import { tokensDark as tokens } from "../../theme";

const Calendar = () => {
  //const theme = useTheme();
  const colors = tokens; // Use the imported tokens directly
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  // Add custom rendering for events to highlight specific dates
  const dayRender = (args) => {
    // Check if there's an event on that date
    const eventDate = args.dateStr;
    const eventExists = currentEvents.some(
      (event) => event.start.toISOString().substring(0, 10) === eventDate
    );

    if (eventExists) {
      args.el.classList.add("highlighted-date"); // Add a CSS class to highlight the date
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.secondary[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {new Date(event.start).toLocaleDateString()} {/* Replace formatDate with native Date method */}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
            dayRender={dayRender} // Adding custom day rendering
          />
        </Box>
      </Box>

      {/* Add custom styling for highlighted dates */}
      <style>
        {`
          .highlighted-date {
            background-color: ${colors.secondary[500]} !important; /* Highlight color */
            border-radius: 50%;
            color: white;
          }
        `}
      </style>
    </Box>
  );
};

export default Calendar;
