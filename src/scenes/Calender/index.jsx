import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Header from "../../components/Header";
import { tokensDark as tokens } from "../../theme";
import Cookie from "js-cookie";
import { url } from "globalbackendurl";

const Calender = () => {
  const colors = tokens;
  const [currentEvents, setCurrentEvents] = useState([]);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookie.get("accessToken");

      try {
        const [postResponse, reminderResponse] = await Promise.all([
          fetch(`${url}/api/schedule/showallpost`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${url}/api/comments/getremainder`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const mappedEvents = [];
        
        // Process Scheduled Posts
        if (postResponse.ok) {
          const postData = await postResponse.json();
          postData.posts.forEach((post) => {
            mappedEvents.push({
              id: post._id,
              title: `Schedule-Post: ${post.status}`,
              start: post.scheduledTime,
              allDay: true,
              backgroundColor: post.status === "pending" ? colors.secondary[500] : "#1B998B",
              extendedProps: {
                content: post.content,
                platform: post.platform,
                source: post.source,
                status: post.status,
              },
            });
          });
        } else {
          console.error("Failed to fetch schedule posts:", postResponse.status);
        }

        // Process Reminders
        if (reminderResponse.ok) {
          const reminderData = await reminderResponse.json();
          reminderData.forEach((reminder) => {
            mappedEvents.push({
              id: reminder._id,
              title: `Reminder: ${reminder.postTitle}`,
              start: reminder.reminderTime,
              allDay: false,
              backgroundColor: colors.primary[500],
            });

            setReminders((prev) => [
              ...prev,
              {
                id: reminder._id,
                title: reminder.postTitle,
                start: reminder.reminderTime,
              },
            ]);
          });
        } else {
          console.error("Failed to fetch reminders:", reminderResponse.status);
        }

        setCurrentEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching posts or reminders:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateClick = async (selected) => {
  const postTitle = prompt("Enter your reminder content:");
  if (!postTitle) {
    alert("Reminder content is required.");
    return;
  }

  const time = prompt("Enter reminder time (HH:mm format):");
  if (!time || !/^\d{2}:\d{2}$/.test(time)) {
    alert("Reminder time is required and must be in HH:mm format.");
    return;
  }

  // Extract full date from selected.startStr
  const datePart = selected.startStr.split("T")[0]; 
  const reminderTime = `${datePart}T${time}:00`;

  // Add visually to calendar
  const calendarApi = selected.view.calendar;
  calendarApi.unselect();

  calendarApi.addEvent({
    id: `${datePart}-${postTitle}`,
    title: `Reminder: ${postTitle}`,
    start: reminderTime,
    allDay: false,
    backgroundColor: colors.primary[500],
  });

  setReminders((prev) => [
    ...prev,
    {
      id: `${datePart}-${postTitle}`,
      title: postTitle,
      start: reminderTime,
    },
  ]);

  // Save to backend
  try {
    const token = Cookie.get("accessToken");
    const response = await fetch(`${url}/api/comments/remainder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postTitle,
        reminderTime,
      }),
    });

    console.log("Title:", postTitle);
    console.log("Time:", reminderTime);

    if (response.ok) {
      alert("Reminder added successfully.");
    } else {
      console.error("Failed to add reminder:", response.status);
    }
  } catch (error) {
    console.error("Error adding reminder:", error);
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
          sx={{
            maxHeight: "90vh",
            overflow: "auto",
            marginBottom:"20px"

          }}
        >
          <Typography variant="h5">Reminders</Typography>
          <List>
            {reminders.map((reminder) => (
              <ListItem
                key={reminder.id}
                sx={{
                  backgroundColor: colors.secondary[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={reminder.title}
                  secondary={
                    <Typography>
                      {new Date(reminder.start).toLocaleString()}
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
            dayMaxEvents={false} // Show all events without collapsing
            select={handleDateClick}
            events={currentEvents}
            eventDisplay="block" // Force all events to display fully
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calender;
