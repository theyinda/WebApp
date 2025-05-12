import { Box } from "@mui/material";
import Register from "@/app/auth/page";

export default function Home() {
  return (
    <div>
      <Box
        sx={{
          marginTop: "5.5rem",
          position: "relative",
        }}
      >
        <Register />
      </Box>
    </div>
  );
}
