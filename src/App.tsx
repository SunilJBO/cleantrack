import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { AppShell } from "./components/layout/app-shell";
import { PinLoginPage } from "./components/auth/pin-login-page";
import { DashboardPage } from "./components/dashboard/dashboard-page";
import { OrderEntryPage } from "./components/orders/order-entry-page";
import { OrderDetailPage } from "./components/orders/order-detail-page";
import { LogisticsPage } from "./components/logistics/logistics-page";
import { PlantPage } from "./components/plant/plant-page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <PinLoginPage />,
  },
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "orders/new", element: <OrderEntryPage /> },
      { path: "orders/:orderId", element: <OrderDetailPage /> },
      { path: "logistics", element: <LogisticsPage /> },
      { path: "plant", element: <PlantPage /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
