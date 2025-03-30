import { createContext, useEffect, useContext, useReducer } from "react";

const BASE_URL = "";

const ProfileContext = createContext();

const apiPaths = [
  "about",
  "achivements",
  "educations",
  "experiences",
  "projects",
  "services",
  "skills",
  "social-medias",
];

const initialState = {
  about: {
    name: "",
    description: "",
    image: "",
    roles: [],
    projects: [],
  },
  achivements: [],
  certifications: [],
  educations: [],
  experiences: [],
  projects: [],
  services: [],
  skills: [],
  socialMedias: [],
  testimonials: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "about/loaded":
      return {
        ...state,
        isLoading: false,
        about: action.payload,
      };

    case "achivements/loaded":
      return { ...state, isLoading: false, achivement: action.payload };

    case "certifications/loaded":
      return { ...state, isLoading: false, certifications: action.payload };

    case "educations/loaded":
      return {
        ...state,
        isLoading: false,
        educations: action.payload,
      };

    case "experiences/loaded":
      return {
        ...state,
        isLoading: false,
        experiences: action.payload,
      };

    case "projects/loaded":
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };

    case "services/loaded":
      return {
        ...state,
        isLoading: false,
        services: action.payload,
      };

    case "skills/loaded":
      return {
        ...state,
        isLoading: false,
        skills: action.payload,
      };

    case "social-medias/loaded":
      return {
        ...state,
        isLoading: false,
        socialMedias: action.payload,
      };

    case "testimonials/loaded":
      return {
        ...state,
        isLoading: false,
        testimonials: action.payload,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function ProfileProvider({ children }) {
  const [
    {
      about,
      achivements,
      certifications,
      educations,
      experiences,
      projects,
      services,
      skills,
      socialMedias,
      testimonials,
      isLoading,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchData({ type }) {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/data/${type}.json`);
        const data = await res.json();
        dispatch({ type: `${type}/loaded`, payload: data.data });
      } catch {
        dispatch({
          type: "rejected",
          payload: `There was an error loading ${type} data...`,
        });
      }
    }

    apiPaths.forEach((type) => fetchData({ type }));
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        about,
        achivements,
        certifications,
        educations,
        experiences,
        projects,
        services,
        skills,
        socialMedias,
        testimonials,
        isLoading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined)
    throw new Error("ProfileContext was used outside the ProfileProvider");
  return context;
}

export { ProfileProvider, useProfile };
