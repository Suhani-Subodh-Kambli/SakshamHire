import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({
  children
}) {
  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft:
            "260px",
          width: "100%"
        }}
      >
        <Navbar />

        <main
          style={{
            padding:
              "2rem"
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;