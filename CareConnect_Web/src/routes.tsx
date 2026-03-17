import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { OnboardingPage } from "./pages/OnboardingPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MedicationsPage } from "./pages/MedicationsPage";
import { MedicationDetailPage } from "./pages/MedicationDetailPage";
import { AddMedicationPage } from "./pages/AddMedicationPage";
import { RefillRequestPage } from "./pages/RefillRequestPage";
import { MessagesPage } from "./pages/MessagesPage";
import { WellnessPage } from "./pages/WellnessPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: OnboardingPage },
      { path: "login", Component: LoginPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "medications", Component: MedicationsPage },
      { path: "medications/:id", Component: MedicationDetailPage },
      { path: "medications/add", Component: AddMedicationPage },
      { path: "medications/:id/edit", Component: AddMedicationPage },
      { path: "refill/:id", Component: RefillRequestPage },
      { path: "messages", Component: MessagesPage },
      { path: "wellness", Component: WellnessPage },
      { path: "settings", Component: SettingsPage },
      { path: "profile", Component: ProfilePage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
