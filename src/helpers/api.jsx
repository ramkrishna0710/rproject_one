import { BASE_URL } from "../config"

export const fetchEventDetails = async () => {
  try {
    const response = await fetch(`${BASE_URL}?reqAction=events`);
    const data = await response.json();
    if (data.requestStatus === "Success") {
      return data.Content;
    } else {
      throw new Error(data.Error || "Failed to fetch speakers.");
    }
  } catch (error) {
    console.error("Error fetching speakers:", error);
    throw error;
  }
}

export const fetchEventDetailsID = async ({id}) => {
  console.log("ID API ", id);

  try {
    const response = await fetch(`${BASE_URL}?reqAction=eventdetail&eventid=${id}`);
    const data = await response.json();
    if (data.requestStatus === "Success") {
      return data.Content;
    } else {
      throw new Error(data.Error || "Failed to fetch speakers.");
    }
  } catch (error) {
    console.error("Error fetching speakers:", error);
    throw error;
  }
}

export const fetchAgenda = async () => {
  try {
    const response = await fetch(`${BASE_URL}?reqAction=agendacat&eventid=4`);
    const data = await response.json();
    if (data.requestStatus === "Success") {
      return data.Content;
    } else {
      throw new Error(data.Error || "Failed to fetch agendas.");
    }
  } catch (error) {
    console.error("Error fetching agendas:", error);
    throw error;
  }
}

export const fetchAgendaDetails = async ({ id }) => {
  console.log("ID fetch ", id);

  try {
    const response = await fetch(`${BASE_URL}?reqAction=agendadetail&eventid=4&agendaid=${id}`)
    const data = await response.json();
    console.log("Details data: ", data);
    if (data.requestStatus === "Success") {
      return data.Content;
    } else {
      throw new Error(data.Error || "Failed to fetch agendaDetails.");
    }
  } catch (error) {
    console.error("Error fetching agendaDetails:", error);
    throw error;
  }
}

export const fetchAgendaSession = async ({ id }) => {
  try {
    const response = await fetch(`${BASE_URL}?reqAction=agendasession&agendaid=${id}`)
    const data = await response.json();
    // console.log("Details Session data: ", data);
    if (data.requestStatus === "Success") {
      return data.Content;
    } else {
      throw new Error(data.Error || "Failed to fetch agendaDetails session.");
    }
  } catch (error) {
    console.error("Error fetching agendaDetails session:", error);
    throw error;
  }
}

export const fetchSessionSpeakers = async ({ id }) => {
  try {
    const response = await fetch(`${BASE_URL}?reqAction=sessionspeakerspanellist&agendaid=${id}`)
    const data = await response.json();
    console.log("Details Session Speaker data: ", data);
    if (data.requestStatus === "Success") {
      return data.data;
    } else {
      throw new Error(data.Error || "Failed to fetch agendaDetails session speakers.");
    }
  } catch (error) {
    console.error("Error fetching agendaDetails session speakers:", error);
    throw error;
  }
}

export const fetchSpeakers = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}?reqAction=speakers`
    );
    const data = await response.json();
    if (data.requestStatus === "Success") {
      return data.Content;
    } else {
      throw new Error(data.Error || "Failed to fetch speakers.");
    }
  } catch (error) {
    console.error("Error fetching speakers:", error);
    throw error;
  }
};

export const fetchVideos = async () => {
  try {
    const response = await fetch(`${BASE_URL}?reqAction=videos&videotypeid=2`)
    const data = await response.json();
    if (data.requestStatus === "Success") {
      return data.Content;
    } else {
      throw new Error(data.Error || "Failed to fetch videos.");
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}

export const fetchSponsors = async () => {
  try {
    const response = await fetch(`${BASE_URL}?reqAction=sponsors`)
    const data = await response.json();
    // console.log("Data sponsors ",data);    
    if (data.requestStatus === "Success") {
      return data.Content;
    } else {
      throw new Error(data.Error || "Failed to fetch Sponsors.");
    }
  } catch (error) {
    console.error("Error fetching Sponsors:", error);
    throw error;
  }
}
